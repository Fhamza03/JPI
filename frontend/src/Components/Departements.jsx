import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function Departements() {
  const location = useLocation();
  const history = useHistory();
  const { subAreaId, subAreaCode, subAreaName } = location.state || {};
  const [departementName, setDepartementName] = useState("");
  const [departementCode, setDepartementCode] = useState("");
  const [departementId, setDepartementId] = useState("");
  const [departements, setDepartements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartements = departements.filter(
    (dept) =>
      dept.departementCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.departementName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const handleTask = (departementId, departementCode, departementName) => {
    history.push("/user/Tasks", {
      departementId: departementId,
      departementCode: departementCode,
      departementName: departementName,
    });
  };
  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              SubArea Information
            </h2>
            <p className="mb-2">
              <strong>SubArea code :</strong> <i>{subAreaCode}</i>
            </p>
            <p className="mb-2">
              <strong>SubArea name :</strong> <i>{subAreaName}</i>
            </p>
          </div>
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-4">
              SubArea Departements
            </h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Departement Code
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Departement Name
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Tasks
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartements.map((dept, index) => (
                  <tr key={index}>
                    <td className="text-center py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {dept.departementCode}
                    </td>
                    <td className="text-center py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {dept.departementName}
                    </td>
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() =>
                          handleTask(
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
          </div>
        </div>
      </div>
    </div>
  );
}
