import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SuccessAlert from "../Components/SuccessAlert";


export default function FormNewDepartement() {
  const location = useLocation();
  const history = useHistory();
  const { subAreaId, subAreaCode, subAreaName } = location.state || {};
  const [departementName, setDepartementName] = useState("");
  const [departementCode, setDepartementCode] = useState("");
  const [departementId, setDepartementId] = useState("");
  const [departements, setDepartements] = useState([]);
  const [showDepartementErrorMessage, setShowDepartementErrorMessage] =
    useState(false);
  const [showDepartementInput, setShowDepartementInput] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [modifiedDepartementCode, setModifiedDepartementCode] = useState("");
  const [modifiedDepartementName, setModifiedDepartementName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const filteredDepartements = departements.filter(
    (dept) =>
      dept.departementCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.departementName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModifyDepartement = async (
    departementId,
    departementCode,
    departementName
  ) => {
    setDepartementId(departementId);
    setModifiedDepartementCode(departementCode); // Set modifiedDepartementCode with the old value
    setModifiedDepartementName(departementName); // Set modifiedDepartementName with the old value
    setShowPrompt(true);
  };

  const confirmModification = async () => {
    setShowPrompt(false);
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const departmentData = {
      departementCode: modifiedDepartementCode,
      departementName: modifiedDepartementName,
      subAreaId: subAreaId,
    };
    try {
      let response = await fetch(
        `http://localhost:8080/admin/updateDepartement/${departementId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Add authorization header
          },
          body: JSON.stringify(departmentData),
        }
      );
      if (response.ok) {
        console.log("Department updated successfully");
        setModifiedDepartementCode("");
        setModifiedDepartementName("");
        fetchDepartements(subAreaId);
      } else {
        console.error("Failed to update department:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const cancelModification = () => {
    setModifiedDepartementCode("");
    setModifiedDepartementName("");
    setShowPrompt(false);
  };
  const handleSaveDepartement = async () => {
    try {
      if (!subAreaId) {
        console.error("SubArea information is missing or invalid.");
        return;
      }
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const base64Credentials = btoa(`${username}:${password}`);

      const departmentData = {
        departementCode: departementCode,
        departementName: departementName,
        subAreaId: subAreaId,
      };

      const response = await fetch(
        `http://localhost:8080/admin/createDepartement/${subAreaId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(departmentData),
        }
      );

      if (response.ok) {
        setShowSuccessAlert(true);
        setDepartementCode("");
        setDepartementName("");
        fetchDepartements(subAreaId);
      } else {
        console.error("Failed to save department:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const handleToggleDepartementInput = () => {
    setShowDepartementInput(!showDepartementInput);
    setShowDepartementErrorMessage(false);
  };
  useEffect(() => {
    if (subAreaId) {
      fetchDepartements(subAreaId);
    }
  }, [subAreaId]);

  const fetchDepartements = async (subAreaId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getDepartementsBySubArea/${subAreaId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDepartements(data);
      } else {
        console.error("Failed to fetch departements:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching departements:", error);
    }
  };

  const handleDeleteDepartement = async (departementId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/admin/deleteDepartement/${departementId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        console.log("Department deleted successfully");
        fetchDepartements(subAreaId);
      } else {
        console.error("Failed to delete department:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleAddTask = (departementId, departementCode, departementName) => {
    history.push("/admin/NewTask", {
      departementId: departementId,
      departementCode: departementCode,
      departementName: departementName,
    });
  };

  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredDepartements.length / itemsPerPage);

  // Calculate the start and end index of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredDepartements.length
  );
  const DepartementsForPage = filteredDepartements.slice(startIndex, endIndex);

  // Define functions for handling pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col mt-11 mr-4 ml-4">
      {showSuccessAlert && (
        <SuccessAlert
          message="You have successfully added the departement."
          onclose={() => setShowSuccessAlert(false)}
        />
      )}
      <div className="flex">
        <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-4">
            Departement Information
          </h2>
          {showDepartementInput ? (
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="text"
                  value={departementCode || ""}
                  onChange={(e) => setDepartementCode(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Departement code"
                />
                <input
                  type="text"
                  value={departementName || ""}
                  onChange={(e) => setDepartementName(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Departement name"
                />

                <button
                  onClick={() => {
                    if (
                      departementCode.trim() !== "" &&
                      departementName.trim() !== ""
                    ) {
                      handleSaveDepartement();
                    } else {
                      setShowDepartementErrorMessage(true);
                    }
                  }}
                  className="middle none center mr-1 rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setShowDepartementErrorMessage(false);
                    handleToggleDepartementInput();
                  }}
                  className="middle none center mr-4 rounded-lg bg-red-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Close
                </button>
              </div>
              {showDepartementErrorMessage &&
                (departementCode.trim() === "" ||
                  departementName.trim() === "") && (
                  <p className="text-red-500 text-sm ml-2">
                    Please enter Departement code and name.
                  </p>
                )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowDepartementErrorMessage(false);
                handleToggleDepartementInput();
              }}
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Open to add Departement
            </button>
          )}
        </div>
        {/* Department Information Card */}
        <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-3">
            SubArea Information
          </h2>
          <div>
          <p>
          <strong>SubArea Code: </strong>{subAreaCode}
          </p>
          <p className="mb-2">
          <strong>SubArea Name: </strong>{subAreaName}

          </p>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-gray-100 rounded-xl shadow-xl mt-6">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-sky-700 font-bold ">
            List of Departements
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
                Departement code
              </th>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Departement name
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
            {DepartementsForPage.map((dept, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
              >
                <td className="text-center py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {dept.departementCode}
                </td>
                <td className="text-center py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {dept.departementName}
                </td>
                <td className="text-center p-4 border-b border-blue-gray-50">
                  <button
                    onClick={() =>
                      handleModifyDepartement(
                        dept.departementId,
                        dept.departementCode,
                        dept.departementName
                      )
                    }
                    className="rounded-lg bg-blue-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDeleteDepartement(dept.departementId)}
                    className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleAddTask(
                        dept.departementId,
                        dept.departementCode,
                        dept.departementName
                      )
                    }
                    className="rounded-lg bg-orange-300 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Add Task
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
        {showPrompt && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
            <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
                Update Departement
              </h2>
              <div className="mb-3">
                <label
                  htmlFor="departementCodeInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Departement Code
                </label>
                <input
                  id="departementCodeInput"
                  type="text"
                  value={modifiedDepartementCode}
                  onChange={(e) => setModifiedDepartementCode(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter new departement code"
                />
              </div>
              {/* Sub-area name input with label */}
              <div className="mb-3">
                <label
                  htmlFor="departementNameInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Departement Name
                </label>
                <input
                  id="departementNameInput"
                  type="text"
                  value={modifiedDepartementName}
                  onChange={(e) => setModifiedDepartementName(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter new departement name"
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
    </div>
  );
}
