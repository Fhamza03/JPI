import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function FormNewSubArea() {
  const location = useLocation();
  const { areaId, areaCode, areaName } = location.state || {};
  const [showSubAreaInput, setShowSubAreaInput] = useState(false);
  const [showSubAreaErrorMessage, setShowSubAreaErrorMessage] = useState(false);
  const [subAreaId, setSubAreaId] = useState("");
  const [subAreaCode, setSubAreaCode] = useState("");
  const [subAreaName, setSubAreaName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [subAreas, setSubAreas] = useState([]);
  const [modifiedSubAreaCode, setModifiedSubAreaCode] = useState("");
  const [modifiedSubAreaName, setModifiedSubAreaName] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();

  const handleToggleSubAreaInput = () => {
    setShowSubAreaInput(!showSubAreaInput);
    setShowSubAreaErrorMessage(false);
  };

  const handleSaveSubArea = async () => {
    try {
      if (!areaId) {
        console.error("Area information is missing or invalid.");
        return;
      }
      const subAreaData = {
        subAreaCode: subAreaCode,
        subAreaName: subAreaName,
        areaId: areaId,
      };
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      let response = await fetch(
        `http://localhost:8080/admin/createSubArea/${areaId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
          body: JSON.stringify(subAreaData),
        }
      );
      if (response.ok) {
        console.log("Sub-Area saved successfully");
        setSubAreaCode("");
        setSubAreaName("");
        fetchSubAreas();
      } else {
        console.error("Failed to save sub-area:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving sub-area:", error);
    }
  };

  const handleDeleteSubArea = async (subAreaId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      let response = await fetch(
        `http://localhost:8080/admin/deleteSubArea/${subAreaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Add authorization header
          },
        }
      );
      if (response.ok) {
        console.log("Sub-Area deleted successfully");
        fetchSubAreas();
      } else {
        console.error("Failed to delete sub-area:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting sub-area:", error);
    }
  };

  const handleModifySubArea = async (subAreaId, subAreaCode, subAreaName) => {
    setSubAreaId(subAreaId);
    setModifiedSubAreaCode(subAreaCode);
    setModifiedSubAreaName(subAreaName); 
    setShowPrompt(true);
  };

  const confirmModification = async () => {
    setShowPrompt(false);
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const subAreaData = {
      subAreaCode: modifiedSubAreaCode,
      subAreaName: modifiedSubAreaName,
      areaId: areaId,
    };
    try {
      let response = await fetch(
        `http://localhost:8080/admin/updateSubArea/${subAreaId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Add authorization header
          },
          body: JSON.stringify(subAreaData),
        }
      );
      if (response.ok) {
        console.log("SubArea updated successfully");
        setModifiedSubAreaCode("");
        setModifiedSubAreaName("");
        fetchSubAreas();
      } else {
        console.error("Failed to update SubArea:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating SubArea:", error);
    }
  };

  const cancelModification = () => {
    setModifiedSubAreaCode("");
    setModifiedSubAreaName("");
    setShowPrompt(false);
  };

  const fetchSubAreas = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      if (!username || !password) {
        console.error("Username or password not found in session.");
        return;
      }

      const credentials = btoa(`${username}:${password}`);
      let url = `http://localhost:8080/getSubAreasByArea/${areaId}`;

      if (searchQuery.trim() !== "") {
        url += `?search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch sub-areas");
      }
      const data = await response.json();
      console.log("Sub-areas fetched successfully:", data);
      setSubAreas(data);
    } catch (error) {
      console.error("Error fetching sub-areas:", error.message);
    }
  };

  useEffect(() => {
    fetchSubAreas();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddDepartement = (subAreaId, subAreaCode, subAreaName) => {
    history.push("/admin/NewDepartement", {
      subAreaId: subAreaId,
      subAreaCode: subAreaCode,
      subAreaName: subAreaName,
    });
  };

  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(subAreas.length / itemsPerPage);

  // Calculate the start and end index of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, subAreas.length);
  const subAreasForPage = subAreas.slice(startIndex, endIndex);

  // Define functions for handling pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col mt-11 mr-4 ml-4">
      <div className="flex">
        <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-4">
            SubArea Information
          </h2>
          {showSubAreaInput ? (
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="text"
                  value={subAreaCode}
                  onChange={(e) => setSubAreaCode(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter SubArea code"
                />
                <input
                  type="text"
                  value={subAreaName}
                  onChange={(e) => setSubAreaName(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter SubArea name"
                />
                <button
                  onClick={() => {
                    if (
                      subAreaCode.trim() !== "" &&
                      subAreaName.trim() !== ""
                    ) {
                      handleSaveSubArea();
                    } else {
                      setShowSubAreaErrorMessage(true);
                    }
                  }}
                  className="middle none center mr-1 rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setShowSubAreaErrorMessage(false);
                    handleToggleSubAreaInput();
                  }}
                  className="middle none center mr-4 rounded-lg bg-red-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Close
                </button>
              </div>
              {showSubAreaErrorMessage &&
                (subAreaCode.trim() === "" || subAreaName.trim() === "") && (
                  <p className="text-red-500 text-sm ml-2">
                    Please enter SubArea code and name.
                  </p>
                )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowSubAreaErrorMessage(false);
                handleToggleSubAreaInput();
              }}
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Open to add SubArea
            </button>
          )}
        </div>

        <div className="w-1/2 p-4 bg-gray-100 mr-3 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-3">
            Area Information
          </h2>
          <div>
            <p>
              <strong>Area Code:</strong> {areaCode} <br />
              <strong>Area Name:</strong> {areaName}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-100 rounded-xl shadow-xl mt-6">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-sky-700 font-bold ">
            List of SubArea
          </h2>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                SubArea code
              </th>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                SubArea name
              </th>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black-200 dark:divide-black-700 dark:bg-white">
            {subAreasForPage
              .filter(
                (subArea) =>
                  subArea.subAreaCode
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  subArea.subAreaName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((subArea, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                >
                  <td className="text-center py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {subArea.subAreaCode}{" "}
                  </td>
                  <td className="text-center py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {subArea.subAreaName}{" "}
                  </td>
                  <td className="text-center p-4 border-b border-blue-gray-50">
                    <button
                      className="rounded-lg bg-blue-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() =>
                        handleModifySubArea(
                          subArea.subAreaId,
                          subArea.subAreaCode,
                          subArea.subAreaName
                        )
                      }
                    >
                      Modify
                    </button>
                    <button
                      className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() => handleDeleteSubArea(subArea.subAreaId)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleAddDepartement(
                          subArea.subAreaId,
                          subArea.subAreaCode,
                          subArea.subAreaName
                        )
                      }
                      className="rounded-lg bg-orange-300 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Add Departement
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
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
      {showPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Update Sub-Area
            </h2>
            {/* Sub-area code input with label */}
            <div className="mb-3">
              <label
                htmlFor="subAreaCodeInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sub-Area Code
              </label>
              <input
                id="subAreaCodeInput"
                type="text"
                value={modifiedSubAreaCode}
                onChange={(e) => setModifiedSubAreaCode(e.target.value)}
                className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                placeholder="Enter new sub-area code"
              />
            </div>
            {/* Sub-area name input with label */}
            <div className="mb-3">
              <label
                htmlFor="subAreaNameInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sub-Area Name
              </label>
              <input
                id="subAreaNameInput"
                type="text"
                value={modifiedSubAreaName}
                onChange={(e) => setModifiedSubAreaName(e.target.value)}
                className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                placeholder="Enter new sub-area name"
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={confirmModification}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-green-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-3"
              >
                Update
              </button>
              <button
                onClick={cancelModification}
                className="flex items-center justify-center w-24 h-12 rounded-lg bg-red-500 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
