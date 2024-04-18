import React from "react";
import { useLocation } from "react-router-dom";

export default function FormNewDatabase() {
  const location = useLocation();
  const { project } = location.state || {}; // Access project from location state

  console.log("Location state:", location.state);
  console.log("Project:", project);

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
