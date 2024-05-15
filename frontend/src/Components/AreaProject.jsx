import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AreaProject() {
  const location = useLocation();
  const { databaseId, databaseType } = location.state || {};
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState({});
  const [departments, setDepartments] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAreas, setExpandedAreas] = useState({});
  const [expandedSubAreas, setExpandedSubAreas] = useState({});
  const [tasks, setTasks] = useState({});
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [expandedFiles, setExpandedFiles] = useState({});
  const [files, setFiles] = useState({});

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const fetchAreas = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getAriasByDatabase/${databaseId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, [databaseId]);

  const fetchSubAreas = async (areaId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      if (!username || !password) {
        console.error("Username or password not found in session.");
        return;
      }

      const credentials = btoa(`${username}:${password}`);
      let url = `http://localhost:8080/getSubAreasByArea/${areaId}`;

      // Append searchQuery to the URL if it's not empty
      if (searchQuery.trim() !== "") {
        url += `?search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`, // Add basic authentication
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch sub-areas");
      }
      const data = await response.json();
      console.log("Sub-areas fetched successfully:", data);
      setSubAreas((prevSubAreas) => ({
        ...prevSubAreas,
        [areaId]: data,
      }));
    } catch (error) {
      console.error("Error fetching sub-areas:", error.message);
    }
  };

  const fetchDepartments = async (subAreaId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getDepartementsBySubArea/${subAreaId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Store departments under their respective subareas in the state
        setDepartments((prevDepartments) => ({
          ...prevDepartments,
          [subAreaId]: data,
        }));
      } else {
        console.error("Failed to fetch departments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchTasks = async (departementId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getTasksByDepartement/${departementId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTasks((prevTasks) => ({
          ...prevTasks,
          [departementId]: data,
        }));
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchFiles = async (taskId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getFilesbyTask/${taskId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFiles((prevFiles) => ({
          ...prevFiles,
          [taskId]: data,
        }));
      } else {
        console.error("Failed to fetch files:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSubArea = async (areaId) => {
    if (!subAreas[areaId]) {
      await fetchSubAreas(areaId);
    }
    setExpandedAreas((prevExpandedAreas) => ({
      ...prevExpandedAreas,
      [areaId]: !prevExpandedAreas[areaId],
    }));
  };

  const handleDepartment = async (subAreaId) => {
    if (!departments[subAreaId]) {
      await fetchDepartments(subAreaId);
    }
    setExpandedSubAreas((prevExpandedSubAreas) => ({
      ...prevExpandedSubAreas,
      [subAreaId]: !prevExpandedSubAreas[subAreaId],
    }));
  };

  const handleTasks = async (departmentId) => {
    if (!tasks[departmentId]) {
      await fetchTasks(departmentId);
    }
    setExpandedDepartments((prevExpandedDepartment) => ({
      ...prevExpandedDepartment,
      [departmentId]: !prevExpandedDepartment[departmentId],
    }));
  };

  const handleFiles = async (taskId) => {
    if (!files[taskId]) {
      await fetchFiles(taskId);
    }
    setExpandedFiles((prevExpandedFiles) => ({
      ...prevExpandedFiles,
      [taskId]: !prevExpandedFiles[taskId],
    }));
  };

  return (
    <div className="dark:bg-gray-800 rounded-lg shadow-xl p-4 ml-8 mr-8 mt-8">
      <ul>
        {areas.map((area) => (
          <li key={area.id}>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                viewBox="0 0 24 24"
                onClick={() => handleSubArea(area.areaId)}
              >
                <path
                  fillRule="evenodd"
                  d={
                    expandedAreas[area.areaId]
                      ? "M10 8V16L17 12Z"
                      : "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                  }
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {area.areaCode} - {area.areaName}
              </span>
            </div>
            {expandedAreas[area.areaId] && subAreas[area.areaId] && (
              <ul className="ml-6">
                {subAreas[area.areaId].map((subArea) => (
                  <li key={subArea.id}>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        onClick={() => handleDepartment(subArea.subAreaId)}
                      >
                        <path
                          fillRule="evenodd"
                          d={
                            expandedSubAreas[subArea.subAreaId]
                              ? "M10 8V16L17 12Z"
                              : "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                          }
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {subArea.subAreaCode} - {subArea.subAreaName}
                      </span>
                    </div>
                    {expandedSubAreas[subArea.subAreaId] &&
                      departments[subArea.subAreaId] && (
                        <ul className="ml-6">
                          {departments[subArea.subAreaId].map((department) => (
                            <li key={department.id}>
                              <div
                                onClick={() =>
                                  handleTasks(department.departementId)
                                }
                                className="flex items-center"
                              >
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d={
                                      expandedDepartments[
                                        department.departementId
                                      ]
                                        ? "M10 8V16L17 12Z"
                                        : "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                    }
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>
                                  {department.departementCode} -{" "}
                                  {department.departementName}
                                </span>
                              </div>
                              {expandedDepartments[department.departementId] &&
                                tasks[department.departementId] && (
                                  <ul className="ml-6">
                                    {tasks[department.departementId].map(
                                      (task) => (
                                        <li key={task.id}>
                                          <div className="flex items-center">
                                            <svg
                                              className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={20}
                                              height={20}
                                              fill="currentColor"
                                              viewBox="0 0 24 24"
                                              onClick={() =>
                                                handleFiles(task.taskId)
                                              }
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d={
                                                  files[task.id] &&
                                                  files[task.id].length > 0
                                                    ? "M10 8V16L17 12Z"
                                                    : "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                                                }
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                            <span>
                                              {task.taskCode} - {task.taskName}
                                            </span>
                                          </div>
                                          {files[task.taskId] &&
                                            files[task.taskId].length > 0 && (
                                              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
                                                <thead className="bg-gray-50 dark:bg-gray-800">
                                                  <th
                                                    scope="col"
                                                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                  >
                                                    Document number
                                                  </th>
  
                                                  <th
                                                    scope="col"
                                                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                  >
                                                    Revision
                                                  </th>
                                                  <th
                                                    scope="col"
                                                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                  >
                                                    Date of Creation
                                                  </th>
                                                  <th
                                                    scope="col"
                                                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                  >
                                                    Title
                                                  </th>
                                                  <th
                                                    scope="col"
                                                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                  >
                                                    Subject of revesion
                                                  </th>
                                                  <th
                                                    scope="col"
                                                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                                  >
                                                    Options
                                                  </th>
                                                </thead>
                                                <tbody>
                                                  {files[task.taskId].map(
                                                    (file,index) => (
                                                      <tr key={file.id}
                                                      className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                                      >
                                                        <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                          {subArea.subAreaCode}-
                                                          {
                                                            department.departementCode
                                                          }
                                                          -{task.taskCode}-
                                                          {file.fileCode}
                                                        </td>
                                                        <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                          {file.rev}
                                                        </td>
                                                        <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                          {formatDate(
                                                            file.created_On
                                                          )}
                                                        </td>
                                                        <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                          {file.fileName}
                                                        </td>
                                                        <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                          {file.subjectOfRev}
                                                        </td>
                                                        <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                          <button className="rounded-lg bg-blue-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2">
                                                            Modify
                                                          </button>
                                                          <button className="rounded-lg bg-green-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2">
                                                            View
                                                          </button>
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </tbody>
                                              </table>
                                            )}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
}
