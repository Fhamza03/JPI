import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FormNewDatabase() {
  const location = useLocation();
  const { project } = location.state || {}; // Access project from location state

  const [showDatabaseInput, setShowDatabaseInput] = useState(false);
  const [databaseInfo, setDatabaseInfo] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [databaseTypes, setDatabaseTypes] = useState([]);
  const [projectDatabases, setProjectDatabases] = useState([]);

  useEffect(() => {
    fetchDatabaseTypes();
    if (project && project.projectId) {
      fetchProjectDatabases(project.projectId);
    }
  }, [project]);

  const fetchDatabaseTypes = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllDatabases");
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
      const response = await fetch(
        `http://localhost:8080/getDatabasesByProject/${projectId}`
      );
      if (response.ok) {
        const data = await response.json();
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

  const handleSaveDatabaseInfo = async () => {
    try {
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
          },
          body: JSON.stringify({
            databaseType: databaseInfo,
          }),
        }
      );

      if (response.ok) {
        console.log("Database info saved successfully");
        setDatabaseInfo("");
        setShowDatabaseInput(false);
      } else {
        console.error("Failed to save database info");
      }
    } catch (error) {
      console.error("Error saving database info:", error);
    }
  };

  const handleOpenDatabase = (databaseType) => {
    // Handle opening the database based on the database type
    console.log(`Opening database: ${databaseType}`);
  };

  const handleEditDatabase = async (databaseId) => {
    try {
      // Implement your edit functionality here
      console.log("Editing database with ID:", databaseId);
    } catch (error) {
      console.error("Error editing database:", error);
    }
  };

  const handleDeleteDatabase = async (databaseId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/deleteDatabase/${databaseId}`,
        {
          method: "DELETE",
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

  const handleAddArea = () => {
    // Redirect to /admin/NewArea
    window.location.href = "/admin/NewArea";
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
                {projectDatabases.map((database) => (
                  <tr key={database.databaseId}>
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      {database.databaseType}
                    </td>
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() =>
                          handleOpenDatabase(database.databaseType)
                        }
                        className="focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditDatabase(database.databaseId)}
                        className="focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
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
                          className="w-6 h-6 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={handleAddArea}
                        className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                      >
                        Add area
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  );
}
