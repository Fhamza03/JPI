import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Projects() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [projects, setProjects] = useState([]);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [databaseLocations, setDatabaseLocations] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch("http://localhost:8080/getAllProjects", {
        headers: {
          Authorization: `Basic ${base64Credentials}`, // Add authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        const locations = data.map((project) => project.databaseLocation);
        const uniqueLocations = [...new Set(locations)];
        setDatabaseLocations(uniqueLocations);
      } else {
        throw new Error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredProjects =
    selectedLocation === "All"
      ? projects
      : projects.filter(
          (project) => project.databaseLocation === selectedLocation
        );

  const searchedProjects = searchQuery
    ? filteredProjects.filter((project) =>
        Object.values(project).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : selectedLocation === "" // Check if "All Database Locations" is selected
    ? projects // If selectedLocation is empty, display all projects
    : filteredProjects;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = (projectId) => {
    const now = new Date().getTime();
    const timeDiff = now - lastClickTime;
    setLastClickTime(now);

    if (timeDiff < 300) {
      handleDoubleClick(projectId);
    }
  };

  const handleDoubleClick = (projectId) => {
    console.log("Double-clicked project ID:", projectId);
    const selected = projects.find(
      (project) => project.projectId === projectId
    );
    console.log("Selected project:", selected);
    setSelectedProject(selected);
    console.log("Selected project state:", selectedProject);
    history.push({
      pathname: "/user/Databases",
      state: { project: selected },
    });
  };

  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="relative flex items-center">
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:border-blue-400 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 dark:focus:border-blue-300"
            >
              <option value="">All Database Locations</option>
              {databaseLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 dark:text-gray-300">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m8 10 4 4 4-4"
                />
              </svg>
            </div>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
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
              value={searchQuery} // Bind value to the searchQuery state
              onChange={handleSearchChange} // Connect onChange event to handleSearchChange function
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Database Location
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Projects
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Project name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Lead office
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Server
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {searchedProjects.map((project) => (
                      <tr
                        key={project.projectId}
                        onClick={() => handleClick(project.projectId)}
                      >
                        {/* Project details cells */}
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.databaseLocation}
                        </td>
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.projectName}
                        </td>
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.projectCode}
                        </td>
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.client}
                        </td>
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.location}
                        </td>
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.leadOffice}
                        </td>
                        <td className="text-center p-4 border-b border-blue-gray-50">
                          {project.serverName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page{" "}
            <span className="font-medium text-gray-700 dark:text-gray-100">
              1 of 10
            </span>
          </div>
          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <a
              href="#"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
