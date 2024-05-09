import React, { useState , useEffect} from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function Databases() {
  const location = useLocation();
  const { project } = location.state || {};
  const history = useHistory();
  const [projectDatabases, setProjectDatabases] = useState([]);
  const [databaseTypes, setDatabaseTypes] = useState([]);

  useEffect(() => {
    fetchDatabaseTypes();
    if (project && project.projectId) {
      fetchProjectDatabases(project.projectId);
    }
  }, [project]);

  const fetchDatabaseTypes = async () => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
  
      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);
  
      const response = await fetch("http://localhost:8080/getAllDatabases", {
        headers: {
          Authorization: `Basic ${base64Credentials}`, // Add authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDatabaseTypes(data);
      } else {
        console.error("Failed to fetch database types");
      }
    } catch (error) {
      console.error("Error fetching database types:", error);
    }
  };
  const fetchProjectDatabases = async (projectId) => {
    try {
      // Retrieve username and password from session storage
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
  
      // Encode credentials as base64
      const base64Credentials = btoa(`${username}:${password}`);
  
      const response = await fetch(
        `http://localhost:8080/getDatabasesByProject/${projectId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`, 
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProjectDatabases(data);
      } else {
        console.error("Failed to fetch project databases");
      }
    } catch (error) {
      console.error("Error fetching project databases:", error);
    }
  };
  const handleArea = (databaseId, databaseType) => {
    history.push("/user/Areas", {
      databaseId: databaseId,
      databaseType: databaseType,
    });
  };
  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
        <div className="w-1/3 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Project Information
            </h2>
            <p className="mb-2">
              <strong>Project Name :</strong> <i>{project.projectName}</i>
            </p>
            <p className="mb-2">
              <strong>Project Code :</strong> <i>{project.projectCode}</i>
            </p>
            <p className="mb-2">
              <strong>Client :</strong> <i>{project.client}</i>
            </p>
            <p className="mb-2">
              <strong>Lead Server :</strong> <i>{project.leadServer}</i>
            </p>
            <p className="mb-2">
              <strong>Lead Office :</strong> <i>{project.leadOffice}</i>
            </p>
            <p className="mb-2">
              <strong>Location :</strong> <i>{project.location}</i>
            </p>
            <p className="mb-2">
              <strong>Database Location :</strong>{" "}
              <i>{project.databaseLocation}</i>
            </p>
            <p className="mb-2">
              <strong>Line of Business :</strong>{" "}
              <i>{project.lineOfBusiness}</i>
            </p>
            <p>
              <strong>Server Name :</strong> <i>{project.serverName}</i>
            </p>
          </div>
          <div className="w-2/3 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-4">Project Databases</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Database Type
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Area
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectDatabases.map((database, index) => (
                  <tr
                    key={database.databaseId}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="text-center p-4 border-b border-blue-gray-50">
                      {database.databaseType}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          handleArea(
                            database.databaseId,
                            database.databaseType
                          )
                        }
                        className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                      >
                        Add area
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
