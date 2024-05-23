import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import SuccessAlert from "../Components/SuccessAlert";
import WarningAlert from "../Components/WarningAlert";

export default function AreaProject() {
  const location = useLocation();
  const history = useHistory();
  const { databaseId, databaseType, project } = location.state || {};
  const [fileId, setFileId] = useState("");
  const [fileName, setFileName] = useState("");
  const [pdf_path, setPdfPath] = useState("");
  const [date, setDate] = useState("");
  const [fileCode, setFileCode] = useState("");
  const [rev, setRev] = useState("");
  const [subjectOfRev, setSubjectOfRev] = useState("");
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState({});
  const [departments, setDepartments] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedAreas, setExpandedAreas] = useState({});
  const [expandedSubAreas, setExpandedSubAreas] = useState({});
  const [tasks, setTasks] = useState({});
  const [taskId, setTaskId] = useState(0);
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [expandedFiles, setExpandedFiles] = useState({});
  const [files, setFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptAddFile, setPromptAddFile] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [hasSelectedFiles, setHasSelectedFiles] = useState(false);
  useEffect(() => {
    setHasSelectedFiles(selectedFiles.length > 0);
  }, [selectedFiles]);

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

      if (searchQuery.trim() !== "") {
        url += `?search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
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

  const fetchFiles = async (id) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getFilesbyTask/${id}`,
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
          [id]: data,
        }));
      } else {
        console.error("Failed to fetch files:", response.statusText);
        console.log(id);
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

  const handleModifyFile = (
    fileId,
    fileName,
    fileCode,
    rev,
    pdf_path,
    subjectOfRev,
    created_On,
    project,
    taskId
  ) => {
    history.push("/user/File", {
      fileId: fileId,
      fileName: fileName,
      fileCode: fileCode,
      rev: rev,
      pdf_path: pdf_path,
      subjectOfRev: subjectOfRev,
      created_On: created_On,
      project: project,
      taskId: taskId,
    });
  };

  const AddToStore = (file) => {
    const data = {
      fileCode: file.fileCode,
      rev: file.rev,
      createdOn: formatDate(file.created_On),
      fileName: file.fileName,
      subjectOfRev: file.subjectOfRev,
    };

    const fileAlreadyExists = selectedFiles.some((selectedFile) => {
      return (
        selectedFile.fileCode === data.fileCode &&
        selectedFile.rev === data.rev &&
        selectedFile.createdOn === data.createdOn &&
        selectedFile.fileName === data.fileName &&
        selectedFile.subjectOfRev === data.subjectOfRev
      );
    });

    if (fileAlreadyExists) {
      setShowWarningAlert(true);
      return;
    }

    setSelectedFiles((prevSelectedFiles) => {
      const updatedSelectedFiles = [...prevSelectedFiles, data];
      setShowSuccessAlert(true);
      return updatedSelectedFiles;
    });
  };

  const handleRemoveFromStore = (index) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedSelectedFiles = [...prevSelectedFiles];
      updatedSelectedFiles.splice(index, 1);
      console.log("Store:", updatedSelectedFiles);
      return updatedSelectedFiles;
    });
  };

  const handleExportAll = () => {
    setShowPrompt(true);
  };
  const cancelExport = () => {
    setShowPrompt(false);
  };
  const exportFiles = () => {
    let workBook = XLSX.utils.book_new(),
      workSheet = XLSX.utils.json_to_sheet(selectedFiles);
    XLSX.utils.book_append_sheet(workBook, workSheet, "JesaFiles");
    XLSX.writeFile(workBook, "JesaFile.xlsx");
    setShowPrompt(false);
  };

  const ShowPromptToAddFile = (taskId) => {
    setPromptAddFile(true);
    setTaskId(taskId);
  };
  const cancelAddFile = () => {
    setPromptAddFile(false);
  };

  const handleAddFile = async (e) => {
    setPromptAddFile(true);
    e.preventDefault();

    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const userId = sessionStorage.getItem("userId");

      const base64Credentials = btoa(`${username}:${password}`);

      const fileData = {
        fileName,
        fileCode,
        rev,
        subjectOfRev,
        pdf_path,
        created_On: formatDate(date),
      };

      const response = await fetch(
        `http://localhost:8080/createFile/${taskId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(fileData),
        }
      );

      if (response.ok) {
        console.log("File saved successfully");
        console.log(fileData);
        setPromptAddFile(false);

        fetchFiles(taskId);
      } else {
        console.error("Failed to save file:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };
  return (
    <div className="dark:bg-gray-800 rounded-lg shadow-xl p-4 ml-8 mr-8 mt-8">
      {showSuccessAlert && (
        <SuccessAlert
          message="You have successfully added the file to the store."
          onclose={() => setShowSuccessAlert(false)}
        />
      )}
      {showWarningAlert && (
        <WarningAlert
          message="The file already exists in the store."
          onclose={() => setShowWarningAlert(false)}
        />
      )}

      <div className="flex justify-start mb-4 mt-3">
        <button
          onClick={handleExportAll}
          className={`rounded-lg bg-blue-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${
            !hasSelectedFiles
              ? "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              : ""
          }`}
          disabled={!hasSelectedFiles}
        >
          Export All
        </button>
      </div>
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
                                          {expandedFiles[task.taskId] &&
                                            files[task.taskId].length > 0 && (
                                              <div>
                                                <div className="flex justify-end mb-4 mt-3">
                                                  <button
                                                    onClick={() =>
                                                      ShowPromptToAddFile(
                                                        task.taskId
                                                      )
                                                    }
                                                    className="rounded-lg bg-blue-500 py-2 px-4 text-xs font-bold uppercase text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                                  >
                                                    Add File in {task.taskName}
                                                  </button>
                                                </div>
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-sm">
                                                  <thead className="bg-gray-50 dark:bg-gray-800">
                                                    <tr>
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
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {files[task.taskId].map(
                                                      (file, index) => (
                                                        <tr
                                                          key={file.id}
                                                          className={
                                                            index % 2 === 0
                                                              ? "bg-white"
                                                              : "bg-gray-200"
                                                          }
                                                        >
                                                          <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                                            {
                                                              subArea.subAreaCode
                                                            }
                                                            -
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
                                                          <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right flex justify-between">
                                                            <svg
                                                              onClick={() =>
                                                                handleModifyFile(
                                                                  file.fileId,
                                                                  file.fileName,
                                                                  file.fileCode,
                                                                  file.rev,
                                                                  file.pdf_path,
                                                                  file.subjectOfRev,
                                                                  file.created_On,
                                                                  project,
                                                                  task.taskId
                                                                )
                                                              }
                                                              className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                                              aria-hidden="true"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              width={24}
                                                              height={24}
                                                              fill="currentColor"
                                                              viewBox="0 0 24 24"
                                                            >
                                                              <path
                                                                fillRule="evenodd"
                                                                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                                                                clipRule="evenodd"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                                                                clipRule="evenodd"
                                                              />
                                                            </svg>
                                                            <svg
                                                              onClick={() =>
                                                                AddToStore(file)
                                                              }
                                                              className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                                              aria-hidden="true"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              width={24}
                                                              height={24}
                                                              fill="currentColor"
                                                              viewBox="0 0 24 24"
                                                            >
                                                              <path
                                                                fillRule="evenodd"
                                                                d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.41A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                                                                clipRule="evenodd"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
                                                                clipRule="evenodd"
                                                              />
                                                            </svg>
                                                          </td>
                                                        </tr>
                                                      )
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
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
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 max-w-3xl shadow-2xl">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-lg">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Document number
                  </th>
                  <th className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Revision
                  </th>
                  <th className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Date of Creation
                  </th>
                  <th className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Title
                  </th>
                  <th className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Subject of revision
                  </th>
                  <th className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedFiles.map((file, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                      {file.fileCode}
                    </td>
                    <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                      {file.rev}
                    </td>
                    <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                      {file.createdOn}
                    </td>
                    <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                      {file.fileName}
                    </td>
                    <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                      {file.subjectOfRev}
                    </td>
                    <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                      <button
                        onClick={() => handleRemoveFromStore(index)}
                        className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-5">
              <button
                onClick={exportFiles}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-green-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-3"
              >
                Export All
              </button>
              <button
                onClick={cancelExport}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-red-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {promptAddFile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Add New File
            </h2>
            <div className="flex mb-3">
              <div className="w-1/2 mr-2">
                <label
                  htmlFor="modifiedFileName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File Name
                </label>
                <input
                  id="modifiedFileName"
                  type="text"
                  onChange={(e) => setFileName(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter modified file name"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label
                  htmlFor="modifiedFileCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File Code
                </label>
                <input
                  id="modifiedFileCode"
                  type="text"
                  onChange={(e) => setFileCode(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter modified file code"
                />
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="modifiedFileRevision"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Revision
              </label>
              <input
                id="modifiedFileRevision"
                type="text"
                onChange={(e) => setRev(e.target.value)}
                className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                placeholder="Enter modified file Revision"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="modifiedFileSubject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject of Revision
              </label>
              <input
                id="modifiedFileSubject"
                type="text"
                onChange={(e) => setSubjectOfRev(e.target.value)}
                className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                placeholder="Enter modified file Subject of revision"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="Upload"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload file
              </label>
              <link
                rel="stylesheet"
                href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
              />
              <input
                type="file"
                id="Upload"
                name="Upload"
                onChange={(e) => setPdfPath(e.target.value)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="modifiedFileCreated"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Created On
              </label>
              <input
                id="modifiedFileCreated"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={handleAddFile}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-green-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-3"
              >
                Add File
              </button>
              <button
                onClick={cancelAddFile}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-red-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
