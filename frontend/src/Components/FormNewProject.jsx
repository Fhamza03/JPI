import React, { useState } from "react";

export default function FormNewProject() {
  const [project, setProject] = useState({
    projectName: "",
    projectCode: "",
    serverName: "",
    location: "",
    lineOfBusiness: "",
    leadServer: "",
    leadOffice: "",
    client: "",
    databaseLocation: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    const allFieldsFilled = Object.values(project).every((value) => value !== "");
    if (!allFieldsFilled) {
      setShowErrorAlert(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/admin/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        console.log("Project created successfully");
        setShowSuccessAlert(true);
        // Clear input fields after successful submission
        setProject({
          projectName: "",
          projectCode: "",
          serverName: "",
          location: "",
          lineOfBusiness: "",
          leadServer: "",
          leadOffice: "",
          client: "",
          databaseLocation: "",
        });
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-5 mb-6 p-6 w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-bold mb-2"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
              placeholder="Enter project name"
              value={project.projectName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectCode"
              className="block text-sm font-bold mb-2"
            >
              Project Code
            </label>
            <input
              type="text"
              id="projectCode"
              name="projectCode"
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
              placeholder="Enter project code"
              value={project.projectCode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-full sm:w-1/2 pr-2">
              <label
                htmlFor="serverName"
                className="block text-sm font-bold mb-2"
              >
                Server Name
              </label>
              <input
                type="text"
                id="serverName"
                name="serverName"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter server name"
                value={project.serverName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full sm:w-1/2 pl-2">
              <label
                htmlFor="location"
                className="block text-sm font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter location"
                value={project.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-full sm:w-1/2 pr-2">
              <label
                htmlFor="lineOfBusiness"
                className="block text-sm font-bold mb-2"
              >
                Line of Business
              </label>
              <input
                type="text"
                id="lineOfBusiness"
                name="lineOfBusiness"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter line of business"
                value={project.lineOfBusiness}
                onChange={handleChange}
              />
            </div>
            <div className="w-full sm:w-1/2 pl-2">
              <label
                htmlFor="leadOffice"
                className="block text-sm font-bold mb-2"
              >
                Lead Office
              </label>
              <input
                type="text"
                id="leadOffice"
                name="leadOffice"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter lead office"
                value={project.leadOffice}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-full sm:w-1/2 pr-2">
              <label
                htmlFor="leadServer"
                className="block text-sm font-bold mb-2"
              >
                Lead Server
              </label>
              <input
                type="text"
                id="leadServer"
                name="leadServer"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter lead server"
                value={project.leadServer}
                onChange={handleChange}
              />
            </div>
            <div className="w-full sm:w-1/2 pl-2">
              <label
                htmlFor="databaseLocation"
                className="block text-sm font-bold mb-2"
              >
                Database Location
              </label>
              <input
                type="text"
                id="databaseLocation"
                name="databaseLocation"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter database location"
                value={project.databaseLocation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="client" className="block text-sm font-bold mb-2">
              Client
            </label>
            <input
              type="text"
              id="client"
              name="client"
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
              placeholder="Enter client name"
              value={project.client}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Project
            </button>
          </div>
        </form>
        {/* Success alert */}
        {showSuccessAlert && (
          <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
          >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Successfully saved!
                      </p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setShowSuccessAlert(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M11.707 9.293a1 1 0 00-1.414 0l-4 4a1 1 0 101.414 1.414l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Error alert */}
        {showErrorAlert && (
          <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
          >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        You have to complete all the information of the project
                      </p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setShowErrorAlert(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M11.707 9.293a1 1 0 00-1.414 0l-4 4a1 1 0 101.414 1.414l4-4a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
