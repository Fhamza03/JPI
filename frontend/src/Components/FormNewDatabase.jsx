import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FormNewDatabase() {
  const location = useLocation();
  const { project } = location.state || {}; // Access project from location state

  if (!project) {
    return <div>No project selected</div>;
  }

  return (
    <div className="flex justify-between">
      {/* Left part */}
      <div className="w-1/2 p-4 bg-gray-100">
        {/* Left part content */}
        <h2 className="text-xl font-bold mb-4">Project Information</h2>
        <div>
          <p><strong>Project Name:</strong> {project.projectName}</p>
          <p><strong>Project Code:</strong> {project.projectCode}</p>
          <p><strong>Client:</strong> {project.client}</p>
          <p><strong>Location:</strong> {project.location}</p>
          <p><strong>Lead Office:</strong> {project.leadOffice}</p>
          <p><strong>Server Name:</strong> {project.serverName}</p>
          {/* Add more project details as needed */}
        </div>
      </div>
      {/* Right part */}
      <div className="w-1/2 p-4 bg-gray-200">
        {/* Right part content */}
        {/* You can add additional forms or components here */}
      </div>
    </div>
  );
}
