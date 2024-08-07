import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function Databases() {
  const location = useLocation();
  const { project } = location.state || {};
  const history = useHistory();
  const [projectDatabases, setProjectDatabases] = useState([]);
  const [databaseTypes, setDatabaseTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchDatabaseTypes();
    if (project && project.projectId) {
      fetchProjectDatabases(project.projectId);
    }
  }, [project]);

  const fetchDatabaseTypes = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch("http://localhost:8080/getAllDatabases", {
        headers: {
          Authorization: `Basic ${base64Credentials}`, 
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDatabaseTypes(data);
      } else {
        console.error("Failed to fetch database types");
      }
    } catch (error) {
      console.error("Error fetching database types:", error);
    }
  };

  const fetchProjectDatabases = async (projectId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getDatabasesByProject/${projectId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProjectDatabases(data);
      } else {
        console.error("Failed to fetch project databases");
      }
    } catch (error) {
      console.error("Error fetching project databases:", error);
    }
  };
  const handleArea = (databaseId, databaseType, project) => {
    history.push("/user/UserProject", {
      databaseId: databaseId,
      databaseType: databaseType,
      project: project,
    });
  };

  const filteredProjectDatabases = projectDatabases.filter((database) =>
    database.databaseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredProjectDatabases.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(
    startIndex + rowsPerPage,
    filteredProjectDatabases.length
  );
  const DatabasesForPage = filteredProjectDatabases.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="pt-10">
      <div>
        <div className="flex justify-between">
          <div className="w-2/5 bg-white border border-sky-500 rounded-lg p-6 m-4 shadow-2xl">
            <h2 className="text-2xl text-sky-700 font-bold mb-4">
              Project Information
            </h2>
            <p className="mb-2">
              <strong>Project Name :</strong> {project.projectName}
            </p>
            <p className="mb-2">
              <strong>Project Code :</strong> {project.projectCode}
            </p>
            <p className="mb-2">
              <strong>Client :</strong> {project.client}
            </p>
            <p className="mb-2">
              <strong>Lead Server :</strong> {project.leadServer}
            </p>
            <p className="mb-2">
              <strong>Lead Office :</strong> {project.leadOffice}
            </p>
            <p className="mb-2">
              <strong>Location :</strong> {project.location}
            </p>
            <p className="mb-2">
              <strong>Database Location :</strong> {project.databaseLocation}
            </p>
            <p className="mb-2">
              <strong>Line of Business :</strong> {project.lineOfBusiness}
            </p>
            <p>
              <strong>Server Name :</strong> {project.serverName}
            </p>
          </div>
          <div className="w-3/5 bg-white border border-sky-500 rounded-lg p-6 m-4 shadow-2xl">
            <h2 className="text-2xl text-sky-700 font-bold mb-4">
              Project Databases
            </h2>
            <div className="flex items-center justify-end mb-3">
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block py-1.5 pr-5 pl-10 text-gray-700 bg-white border border-gray-200 rounded-lg w-52 md:w-80 placeholder-gray-400/70 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-md">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Database Type
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Area
                  </th>
                </tr>
              </thead>
              <tbody>
                {DatabasesForPage.map((database, index) => (
                  <tr
                    key={database.databaseId}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      {database.databaseType}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          handleArea(
                            database.databaseId,
                            database.databaseType,
                            project
                          )
                        }
                        className="rounded-lg bg-sky-700 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                      >
                        View areas
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page{" "}
                <span className="font-medium text-gray-700 dark:text-gray-100">
                  {currentPage} of {totalPages}
                </span>
              </div>
              <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <button
                  className="shadow-md flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                  <span>previous</span>
                </button>
                <button
                  className="shadow-md flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <span>Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:-scale-x-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
