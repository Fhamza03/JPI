import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import SuccessAlert from "../Components/SuccessAlert";
import WarningAlert from "../Components/WarningAlert";

export default function FormNewProject() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const history = useHistory();
  const location = useLocation();

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

  useEffect(() => {
    if (location.state && location.state.project) {
      const { project: initialProject } = location.state;
      setProject(initialProject);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if all fields are filled
    const allFieldsFilled = Object.values(project).every(
      (value) => value !== ""
    );
    if (!allFieldsFilled) {
      setShowWarningAlert(true);
      return;
    }

    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const response = await fetch(
        "http://localhost:8080/admin/createProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Add authorization header
          },
          body: JSON.stringify(project),
        }
      );

      if (response.ok) {
        setShowSuccessAlert(true);
        setShowSuccessAlert(true);
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
    <div className="flex justify-center mt-8">
      {showSuccessAlert && (
        <SuccessAlert
          message="You have successfully added the project."
          onclose={() => setShowSuccessAlert(false)}
        />
      )}
      {showWarningAlert && (
        <WarningAlert
          message="Please fill all the project informations."
          onclose={() => setShowWarningAlert(false)}
        />
      )}
      <div className="max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden mt-5 mb-6 p-6 w-full">
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
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
