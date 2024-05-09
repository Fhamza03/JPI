import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function SubAreas() {
  const location = useLocation();
  const { areaId, areaCode, areaName } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [subAreaId, setSubAreaId] = useState("");
  const [subAreaCode, setSubAreaCode] = useState("");
  const [subAreaName, setSubAreaName] = useState("");
  const [subAreas, setSubAreas] = useState([]);
  const history = useHistory();

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

      // Append searchQuery to the URL if it's not empty
      if (searchQuery.trim() !== "") {
        url += `?search=${encodeURIComponent(searchQuery.trim())}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${credentials}`, // Add basic authentication
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

  const handleDepartement = (subAreaId, subAreaCode, subAreaName) => {
    history.push("/user/Departements", {
      subAreaId: subAreaId,
      subAreaCode: subAreaCode,
      subAreaName: subAreaName,
    });
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Area Information
            </h2>
            <p className="mb-2">
              <strong>Area code :</strong> <i>{areaCode}</i>
            </p>
            <p className="mb-2">
              <strong>Area name :</strong> <i>{areaName}</i>
            </p>
          </div>
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-4">Area SubAreas</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    SubArea Code
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    SubArea Name
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Departements
                  </th>
                </tr>
              </thead>
              <tbody>
                {subAreas
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
                    <tr key={index}>
                      <td className="text-center py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {subArea.subAreaCode}{" "}
                      </td>
                      <td className="text-center py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                        {subArea.subAreaName}{" "}
                      </td>
                      <td className="text-center p-4 border-b border-blue-gray-50">
                        <button
                          onClick={() =>
                            handleDepartement(
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
          </div>
        </div>
      </div>
    </div>
  );
}
