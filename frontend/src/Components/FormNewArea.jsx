import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function FormNewArea(props) {
  const location = useLocation();
  const history = useHistory();
  const { databaseId, databaseType } = location.state || {};

  const [areaCode, setAreaCode] = useState("");
  const [areaName, setAreaName] = useState("");

  const [showAreaErrorMessage, setShowAreaErrorMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [showAreaInput, setShowAreaInput] = useState(false);

  // Fetch areas
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
            Authorization: `Basic ${base64Credentials}`, // Add authorization header
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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Save area
  const handleSaveArea = async () => {
    try {
      if (!databaseId) {
        console.error("Database information is missing or invalid.");
        return;
      }
      const areaData = {
        areaCode: areaCode,
        areaName: areaName,
        databaseId: databaseId,
      };

      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);

      let response = await fetch(
        `http://localhost:8080/admin/createArea/${databaseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`, // Add authorization header
          },
          body: JSON.stringify(areaData),
        }
      );
      if (response.ok) {
        console.log("Area saved successfully");
        setAreaCode("");
        setAreaName("");
        fetchAreas();
      } else {
        console.error("Failed to save area:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving area:", error);
    }
  };

  // Delete area
  const handleDelete = async (areaId) => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/admin/deleteArea/${areaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${base64Credentials}`, // Add authorization header
          },
        }
      );
      if (response.ok) {
        fetchAreas();
      } else {
        console.error("Failed to delete area:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting area:", error);
    }
  };

  // Modify the `confirmModification` function to handle area updates
  const confirmModification = async () => {
    setShowPrompt(false); // Close the prompt modal
    const areaData = {
      areaCode: areaCode,
      areaName: areaName,
      databaseId: databaseId,
    };
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
  
      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);
  
      let response = await fetch(
        `http://localhost:8080/admin/updateArea/${areaId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`, // Add authorization header
          },
          body: JSON.stringify(areaData),
        }
      );
      if (response.ok) {
        console.log("Area updated successfully");
        fetchAreas(); // Fetch areas again to update the list
      } else {
        console.error("Failed to update area:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating area:", error);
    }
  };
  

  const handleModify = async (areaId, areaCode, areaName) => {
    setAreaId(areaId);
    setAreaCode(areaCode);
    setAreaName(areaName);
    setShowPrompt(true); // Show the prompt modal
  };

  // Cancel modification
  const cancelModification = () => {
    setShowPrompt(false); // Close the prompt modal
  };
  const handleToggleAreaInput = () => {
    setShowAreaInput(!showAreaInput);
    setShowAreaErrorMessage(false);
  };
  const handleAddSubArea = (areaId, areaCode, areaName) => {
    history.push("/admin/NewSubArea", {
      areaId: areaId,
      areaCode: areaCode,
      areaName: areaName,
    });
  };

  return (
    <div className="flex flex-col mt-11 mr-4 ml-4">
      <div className="flex">
        <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
            Area Information
          </h2>
          {showAreaInput ? (
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="text"
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter area code"
                />
                <input
                  type="text"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter area name"
                />
                <button
                  onClick={() => {
                    if (areaCode.trim() !== "" && areaName.trim() !== "") {
                      handleSaveArea(); // Call handleSaveArea without passing areaId
                    } else {
                      setShowAreaErrorMessage(true);
                    }
                  }}
                  className="middle none center mr-1 rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setShowAreaErrorMessage(false);
                    handleToggleAreaInput();
                  }}
                  className="middle none center mr-4 rounded-lg bg-red-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Close
                </button>
              </div>
              {showAreaErrorMessage &&
                (areaCode.trim() === "" || areaName.trim() === "") && (
                  <p className="text-red-500 text-sm ml-2">
                    Please enter area code and name.
                  </p>
                )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAreaErrorMessage(false);
                handleToggleAreaInput();
              }}
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Open to add Area
            </button>
          )}
        </div>

        <div className="w-1/2 p-4 bg-gray-100 mr-3 rounded-xl shadow-xl">
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
            Database Information
          </h2>
          <div>
            <p>
              <strong>Database Type:</strong> {databaseType}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-100 rounded-xl shadow-xl mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-sky-700 font-bold font-serif">
            {databaseType} list of area
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
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
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
                Area code
              </th>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Area name
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
            {areas
              .filter((area) =>
                `${area.areaCode} ${area.areaName}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((area) => (
                <tr key={area.areaId}>
                  <td className="text-center p-4 border-b border-blue-gray-50">
                    {area.areaCode}
                  </td>
                  <td className="text-center p-4 border-b border-blue-gray-50">
                    {area.areaName}
                  </td>
                  <td className="text-center p-4 border-b border-blue-gray-50">
                    <button
                      className="rounded-lg bg-blue-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() => handleModify(area.areaId,area.areaCode, area.areaName)}
                    >
                      Modify
                    </button>
                    <button
                      className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() => handleDelete(area.areaId)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleAddSubArea(
                          area.areaId,
                          area.areaCode,
                          area.areaName
                        )
                      }
                      className="rounded-lg bg-orange-300 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                      Add Sub Area
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showPrompt && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
                Update Area
              </h2>
              {/* Area code input with label */}
              <div className="mb-3">
                <label
                  htmlFor="areaCodeInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Area Code
                </label>
                <input
                  id="areaCodeInput"
                  type="text"
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter new area code"
                />
              </div>
              {/* Area name input with label */}
              <div className="mb-3">
                <label
                  htmlFor="areaNameInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Area Name
                </label>
                <input
                  id="areaNameInput"
                  type="text"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter new area name"
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
