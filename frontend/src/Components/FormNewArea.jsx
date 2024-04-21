import React, { useState } from "react";

import { useLocation } from "react-router-dom";

export default function FormNewArea(props) {
  const location = useLocation();
  const { databaseInfo } = location.state || {};

  const [showAreaInput, setShowAreaInput] = useState(false);
  const [areaCode, setAreaCode] = useState("");
  const [areaName, setAreaName] = useState("");
  const [showAreaErrorMessage, setShowAreaErrorMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state
  const handleSearchChange = (e) => setSearchQuery(e.target.value); // Define handleSearchChange function

  const handleToggleAreaInput = () => {
    setShowAreaInput(!showAreaInput);
    setShowAreaErrorMessage(false);
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
                      handleToggleAreaInput();
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
              <strong>Database Type:</strong> {databaseInfo}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-gray-100 rounded-xl shadow-xl mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-sky-700 font-bold font-serif">
            {databaseInfo} list of area
          </h2>
          {/* Search Bar */}
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
        {/* Table JSX */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Header */}
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
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-black-200 dark:divide-black-700 dark:bg-white">
            <tr>
              <td className="text-center p-4 border-b border-blue-gray-50">
                Data 1
              </td>
              <td className="text-center p-4 border-b border-blue-gray-50">
                Data 2
              </td>
              <td className="text-center p-4 border-b border-blue-gray-50">
                Data 2
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
