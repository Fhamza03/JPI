import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function FormNewDatabase() {
  const location = useLocation();
  const { project } = location.state || {}; // Access project from location state

  const [showDatabaseInput, setShowDatabaseInput] = useState(false);
  const [databaseInfo, setDatabaseInfo] = useState("");

  const handleToggleDatabaseInput = () => {
    setShowDatabaseInput(!showDatabaseInput);
  };

  const handleSaveDatabaseInfo = async () => {
    try {
      if (!project || !project.projectId) {
        console.error("Project or projectId not found");
        return;
      }

      const projectId = project.projectId;
      const response = await fetch(`http://localhost:8080/admin/createDatabase/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          databaseType: databaseInfo,
        }),
      });

      if (response.ok) {
        console.log("Database info saved successfully");
        // Clear the input field after saving
        setDatabaseInfo("");
        // Optionally, you can close the input field after saving
        setShowDatabaseInput(false);
      } else {
        console.error("Failed to save database info");
      }
    } catch (error) {
      console.error("Error saving database info:", error);
    }
  };

  if (!project) {
    return <div>No project selected</div>;
  }

  return (
    <div>
      <div className="flex mt-11 mr-4 ml-4">
        {/* Right part */}
        <div className="w-1/2 p-4 bg-gray-200 mr-3">
          {/* Right part content */}
          <h2 className="text-xl font-bold mb-4">Project Databases</h2>
          {/* Render database details here if needed */}
          {showDatabaseInput && (
            <div className="flex items-center">
              <input
                type="text"
                value={databaseInfo}
                onChange={(e) => setDatabaseInfo(e.target.value)}
                className="mr-2 border rounded px-2 py-1 focus:outline-none"
                placeholder="Enter database information"
              />
              <button
                onClick={handleSaveDatabaseInfo}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          )}
          <button
            onClick={handleToggleDatabaseInput}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            {showDatabaseInput ? "Hide Database Input" : "Show Database Input"}
          </button>
        </div>
        {/* Left part */}
        <div className="w-1/2 p-4 bg-gray-200 ml-3">
          {/* Left part content */}
          <h2 className="text-xl font-bold mb-4">Project Information</h2>
          <p>
            <strong>Project Name:</strong> {project.projectName}
          </p>
          <p>
            <strong>Project Code:</strong> {project.projectCode}
          </p>
          <p>
            <strong>Client:</strong> {project.client}
          </p>
          <p>
            <strong>Lead Server:</strong> {project.leadServer}
          </p>
          <p>
            <strong>Lead Office:</strong> {project.leadOffice}
          </p>
          <p>
            <strong>Location:</strong> {project.location}
          </p>
          <p>
            <strong>Database Location:</strong> {project.databaseLocation}
          </p>
          <p>
            <strong>Line of Business:</strong> {project.lineOfBusiness}
          </p>
          <p>
            <strong>Server Name:</strong> {project.serverName}
          </p>
        </div>
      </div>
    </div>
  );
}
