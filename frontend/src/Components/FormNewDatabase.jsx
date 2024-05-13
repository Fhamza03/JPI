import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function FormNewDatabase() {
  const location = useLocation();
  const { project } = location.state || {}; // Access project from location state
  const history = useHistory();

  const [showDatabaseInput, setShowDatabaseInput] = useState(false);
  const [databaseType, setDatabaseType] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [databaseTypes, setDatabaseTypes] = useState([]);
  const [projectDatabases, setProjectDatabases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [modifiedDatabaseType, setModifiedDatabaseType] = useState("");

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
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch("http://localhost:8080/getAllDatabases", {
        headers: {
          Authorization: `Basic ${base64Credentials}`, // Add authorization header
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

  const fetchProjectDatabases = async (projectId) => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getDatabasesByProject/${projectId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`, // Add authorization header
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

  const handleToggleDatabaseInput = () => {
    setShowDatabaseInput(!showDatabaseInput);
    setShowErrorMessage(false); // Hide error message when toggling input field
  };

  const handleSaveDatabaseType = async () => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      if (!project || !project.projectId) {
        console.error("Project or projectId not found");
        return;
      }

      const projectId = project.projectId;
      const response = await fetch(
        `http://localhost:8080/admin/createDatabase/${projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Add authorization header
          },
          body: JSON.stringify({
            databaseType: databaseType,
          }),
        }
      );

      if (response && response.ok) {
        console.log("Database info saved successfully");
        setDatabaseType("");
        setShowDatabaseInput(false);
        fetchProjectDatabases(project.projectId);
      } else {
        console.error("Failed to save database info");
      }
    } catch (error) {
      console.error("Error saving database info:", error);
    }
  };

  const confirmModification = async () => {
    setShowPrompt(false);
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const DatabaseData = {
      databaseType: modifiedDatabaseType
    };
    try {
      let response = await fetch(
        `http://localhost:8080/admin/updateDatabase/${databaseId}/${project.projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
          body: JSON.stringify(DatabaseData),
        }
      );
      if (response.ok) {
        console.log("Database updated successfully");
        // Update projectDatabases with modified value
        const updatedDatabases = projectDatabases.map(database => {
          if (database.databaseId === databaseId) {
            return {
              ...database,
              databaseType: modifiedDatabaseType
            };
          }
          return database;
        });
        setProjectDatabases(updatedDatabases);
        setModifiedDatabaseType(""); // Clear modified value
      } else {
        console.error("Failed to update Database:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Database:", error);
    }
  };
  

  const cancelModification = () => {
    setModifiedDatabaseType("");
    setShowPrompt(false);
  };

  const handleModifyDatabase = async (databaseId, databaseType) => {
    setDatabaseId(databaseId);
    setOldValue(databaseType); // Set the old value
    setModifiedDatabaseType(databaseType);
    setShowPrompt(true);
  };

  const handleDeleteDatabase = async (databaseId) => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const response = await fetch(
        `http://localhost:8080/admin/deleteDatabase/${databaseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Add authorization header
          },
        }
      );
      if (response.ok) {
        console.log("Database deleted successfully");
        // Update the UI by refetching project databases
        fetchProjectDatabases(project.projectId);
      } else {
        console.error("Failed to delete database");
      }
    } catch (error) {
      console.error("Error deleting database:", error);
    }
  };

  const handleAddArea = (databaseId, databaseType) => {
    history.push("/admin/NewArea", {
      databaseId: databaseId,
      databaseType: databaseType,
    });
  };

  if (!project) {
    return <div>No project selected</div>;
  }
  return (
    <div>
      <div className="flex mt-11 mr-4 ml-4">
        {/* Right part */}
        <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
            Project Databases
          </h2>
          {/* Render database details here if needed */}
          {showDatabaseInput ? (
            <div className="flex flex-col">
              {" "}
              {/* Flex container with column layout */}
              <div className="flex items-center">
                {" "}
                {/* Input and buttons container */}
                <input
                  type="text"
                  value={databaseType}
                  onChange={(e) => setDatabaseType(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter database type"
                />
                <button
                  onClick={() => {
                    if (databaseType.trim() !== "") {
                      // Validate if input is not empty
                      handleSaveDatabaseType(); // Save data if input is not empty
                      handleToggleDatabaseInput(); // Close input field
                    } else {
                      setShowErrorMessage(true); // Show error message if input is empty
                    }
                  }}
                  className="middle none center mr-1 rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowErrorMessage(false); // Hide error message when toggling input field
                    handleToggleDatabaseInput();
                  }}
                  className="middle none center mr-4 rounded-lg bg-red-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Close
                </button>
              </div>
              {showErrorMessage &&
                databaseType.trim() === "" && ( // Check if input is empty and error message is set to be shown
                  <p className="text-red-500 text-sm ml-2">
                    Please enter database information.
                  </p> // Display error message if input is empty
                )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowErrorMessage(false); // Hide error message when toggling input field
                handleToggleDatabaseInput();
              }}
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Open to add Database
            </button>
          )}

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
          {/* Your existing table */}
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                    Options
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Area
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black-200 dark:divide-black-700 dark:bg-white">
                {DatabasesForPage.map((database, index) => (
                  <tr
                    key={database.databaseId}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      {database.databaseType}
                    </td>
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      {/* Add onClick handler with databaseId and databaseType */}
                      <button
                        onClick={() =>
                          handleModifyDatabase(
                            database.databaseId,
                            database.databaseType
                          )
                        }
                        className="focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white mr-2 inline-block align-text-bottom"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
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
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteDatabase(database.databaseId)
                        }
                        className="focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white mr-2 inline-block align-text-bottom"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="text-center">
                      {/* Pass both databaseId and databaseType */}
                      <button
                        onClick={() =>
                          handleAddArea(
                            database.databaseId,
                            database.databaseType
                          )
                        }
                        className="rounded-lg bg-orange-300 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                      >
                        Add area
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
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
                  className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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

        {/* Left part */}
        <div className="w-1/2 p-4 bg-gray-100 mr-3 rounded-xl shadow-xl">
          {/* Left part content */}
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
            Project Information
          </h2>
          <p className="mb-2">
            <strong>Project Name :</strong> <i>{project.projectName}</i>
          </p>
          <p className="mb-2">
            <strong>Project Code :</strong> <i>{project.projectCode}</i>
          </p>
          <p className="mb-2">
            <strong>Client :</strong> <i>{project.client}</i>
          </p>
          <p className="mb-2">
            <strong>Lead Server :</strong> <i>{project.leadServer}</i>
          </p>
          <p className="mb-2">
            <strong>Lead Office :</strong> <i>{project.leadOffice}</i>
          </p>
          <p className="mb-2">
            <strong>Location :</strong> <i>{project.location}</i>
          </p>
          <p className="mb-2">
            <strong>Database Location :</strong>{" "}
            <i>{project.databaseLocation}</i>
          </p>
          <p className="mb-2">
            <strong>Line of Business :</strong> <i>{project.lineOfBusiness}</i>
          </p>
          <p>
            <strong>Server Name :</strong> <i>{project.serverName}</i>
          </p>
        </div>
      </div>
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Update Database
            </h2>
            <div className="mb-3">
              <label
                htmlFor="subAreaCodeInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Database type
              </label>
              <input
                id="databaseType"
                type="text"
                value={modifiedDatabaseType}
                onChange={(e) => setModifiedDatabaseType(e.target.value)}
                className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                placeholder="Enter new database type"
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={confirmModification}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-green-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-3"
              >
                Update
              </button>
              <button
                onClick={cancelModification}
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
