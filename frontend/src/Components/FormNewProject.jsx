import React, { useState } from "react";

export default function FormNewProject() {
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [serverName, setServerName] = useState("");
  const [location, setLocation] = useState("");
  const [lineOfBusiness, setLineOfBusiness] = useState("");
  const [leadServer, setLeadServer] = useState("");
  const [leadOffice, setLeadOffice] = useState("");
  const [client, setClient] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const databaseLocations = ["CASABLANCA", "JORF", "LAAYOUNE"];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mt-9 mb-6 p-6 w-full">
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
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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
              className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
              placeholder="Enter project code"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter server name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <div className="w-full sm:w-1/2 pr-2">
              <label
                htmlFor="lineOfBusiness"
                className="block text-sm font-bold mb-2"
              >
                Line of business
              </label>
              <input
                type="text"
                id="lineOfBusiness"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter line of business"
                value={lineOfBusiness}
                onChange={(e) => setLineOfBusiness(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2 pl-2">
              <label
                htmlFor="leadOffice"
                className="block text-sm font-bold mb-2"
              >
                Lead office
              </label>
              <input
                type="text"
                id="leadOffice"
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter lead office"
                value={leadOffice}
                onChange={(e) => setLeadOffice(e.target.value)}
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
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
                placeholder="Enter lead server"
                value={leadServer}
                onChange={(e) => setLeadServer(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2 pl-2">
              <label
                htmlFor="databaseLocation"
                className="block text-sm font-bold mb-2"
              >
                Database Location
              </label>
              <select
                id="databaseLocation"
                value={selectedLocation}
                onChange={handleLocationChange}
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500"
              >
                <option value="">Select database location</option>
                {databaseLocations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
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
      </div>
    </div>
  );
}
