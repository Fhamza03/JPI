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

  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
        <div className="w-1/3 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Database Information
            </h2>
            <p className="mb-2">
              <strong>Database type :</strong> <i>{databaseType}</i>
            </p>
          </div>
          <div className="w-2/3 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-4">Database Areas</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                {areas
                  .filter((area) =>
                    `${area.areaCode} ${area.areaName}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((area,index) => (
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
                          className="rounded-lg bg-orange-300 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          Sub Area
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
