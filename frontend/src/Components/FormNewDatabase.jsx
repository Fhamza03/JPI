import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function FormNewDatabase() {
  const location = useLocation();
  const { project } = location.state || {}; // Access project from location state
  const history = useHistory();

  const [showDatabaseInput, setShowDatabaseInput] = useState(false);
  const [databaseType, setDatabaseType] = useState("");
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

  const handleOpenDatabase = (databaseType) => {
    // Handle opening the database based on the database type
    console.log(`Opening database: ${databaseType}`);
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
  useEffect(() => {
    const { databaseType } = location.state || {};
    if (!databaseType) {
      console.error("Database information is missing or invalid.");
      return;
    }
    // You can log the databaseInfo here to ensure it's received correctly
    console.log("Received databaseInfo:", databaseType);
  }, [location.state]);

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
                      {/* Add onClick handler with databaseId and databaseType */}
                      <button
                        onClick={() =>
                          handleOpenDatabase(database.databaseType)
                        }
                        className="focus:outline-none"
                      >
                        {/* SVG icon */}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteDatabase(database.databaseId)
                        }
                        className="focus:outline-none"
                      >
                        {/* SVG icon */}
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
