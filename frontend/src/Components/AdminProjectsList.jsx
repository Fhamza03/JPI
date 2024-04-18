import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FormNewDatabase from "./FormNewDatabase";

export default function AdminProjectsList() {
  const [projects, setProjects] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [databaseLocations, setDatabaseLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastClickTime, setLastClickTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects and database locations when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects and database locations from API
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/getAllProjects"
      );
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        // Extract databaseLocations from projects data
        const locations = data.map((project) => project.databaseLocation);
        // Filter out duplicate locations
        const uniqueLocations = [...new Set(locations)];
        setDatabaseLocations(uniqueLocations);
      } else {
        throw new Error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Event handler for location change
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Filter projects based on selected location
  const filteredProjects = selectedLocation
    ? projects.filter(
        (project) => project.databaseLocation === selectedLocation
      )
    : projects;

  // Filter projects based on search query
  const searchedProjects = searchQuery
    ? filteredProjects.filter((project) =>
        Object.values(project).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : filteredProjects;

  // Event handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const history = useHistory();

  const handleClick = (projectId) => {
    const now = new Date().getTime();
    const timeDiff = now - lastClickTime;
    setLastClickTime(now);

    if (timeDiff < 300) {
      // Adjust this value as needed
      handleDoubleClick(projectId);
    }
  };

  const handleDoubleClick = (projectId) => {
    console.log('Double-clicked project ID:', projectId);
    const selected = projects.find((project) => project.projectId === projectId);
    console.log('Selected project:', selected); // Log the selected project
    setSelectedProject(selected); // Set the selected project state
    console.log('Selected project state:', selectedProject); // Log the selected project state
    history.push({
      pathname: '/admin/NewDatabase',
      state: { project: selected } // Pass the selected project as state
    });
};

// Handler for editing project
const handleEditProject = (projectId) => {
  const selectedProject = projects.find((project) => project.projectId === projectId);
  if (selectedProject) {
    history.push({
      pathname: '/admin/NewProject',
      state: { project: selectedProject }
    });
  }
};

// Handler for removing project
const handleRemoveProject = async (projectId) => {
  try {
    const response = await fetch(`http://localhost:8080/admin/deleteProject/${projectId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setProjects(projects.filter(project => project.projectId !== projectId));
      console.log("Project deleted !!")
    } else {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error removing project:', error);
  }
};


  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
          {/* Location select dropdown */}
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
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </span>
          </div>
          {/* Search input */}
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
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        {/* Table section */}
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Table header */}
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Database Location
                      </th>
                      <th
                        scope="col"
                        className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Projects
                      </th>
                      <th
                        scope="col"
                        className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Project name
                      </th>
                      <th
                        scope="col"
                        className="text-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="text-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Lead office
                      </th>
                      <th
                        scope="col"
                        className="text-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Server
                      </th>
                      <th
                        scope="col"
                        className="text-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Options
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody className="bg-white divide-y divide-black-200 dark:divide-black-700 dark:bg-white">
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
                        <td className="text-left p-4 border-b border-blue-gray-50">
                          {/* Edit and Remove icons */}
                          <svg
                          onClick={() => handleRemoveProject(project.projectId)}
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
                          <svg
                          onClick={() => handleEditProject(project.projectId)}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}
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
      {/* Check if selectedProject is not null before rendering FormNewDatabase */}
      {selectedProject ? (
        <FormNewDatabase project={selectedProject} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
