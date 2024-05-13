import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function Areas() {
  const location = useLocation();
  const { databaseId, databaseType } = location.state || {};
  const history = useHistory();
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [areaName, setAreaName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchAreas = async () => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getAriasByDatabase/${databaseId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, [databaseId]);

  const handleSubArea = (areaId, areaCode, areaName) => {
    history.push("/user/SubAreas", {
      areaId: areaId,
      areaCode: areaCode,
      areaName: areaName,
    });
  };

  // Calculate the number of pages
  const totalPages = Math.ceil(areas.length / 5);

  // Calculate the index of the first area for the current page
  const startIndex = (currentPage - 1) * 5;

  // Slice the areas array to get areas for the current page
  const areasForPage = areas.slice(startIndex, startIndex + 5);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
          <div className="w-1/3 bg-white border border-gray-300 rounded-lg p-6 m-4 shadow-2xl">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Database Information
            </h2>
            <p className="mb-2">
              <strong>Database type :</strong> <i>{databaseType}</i>
            </p>
          </div>
          <div className="w-2/3 bg-white border border-gray-300 rounded-lg p-6 m-4 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4">Database Areas</h2>
            <div className="flex items-center justify-end mb-3">
              <div className="relative flex items-center">
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
                  className="block py-1.5 pr-5 pl-10 text-gray-700 bg-white border border-gray-200 rounded-lg w-52 md:w-80 placeholder-gray-400/70 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow-md">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Area Code
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Area Name
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Sub Areas
                  </th>
                </tr>
              </thead>
              <tbody>
                {areasForPage
                  .filter((area) =>
                    `${area.areaCode} ${area.areaName}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((area, index) => (
                    <tr
                      key={area.areaId}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                    >
                      <td className="text-center p-4 border-b border-blue-gray-50">
                        {area.areaCode}
                      </td>
                      <td className="text-center p-4 border-b border-blue-gray-50">
                        {area.areaName}
                      </td>
                      <td className="text-center p-4 border-b border-blue-gray-50">
                        <button
                          onClick={() =>
                            handleSubArea(
                              area.areaId,
                              area.areaCode,
                              area.areaName
                            )
                          }
                          className="rounded-lg bg-sky-700 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:..."
                        >
                          View Sub-Areas
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page{" "}
                <span className="font-medium text-gray-700 dark:text-gray-100">
                  {currentPage} of {totalPages}
                </span>
              </div>
              <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <button
                  className="shadow-md flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
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
                </button>
                <button
                  className="shadow-md flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
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
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
