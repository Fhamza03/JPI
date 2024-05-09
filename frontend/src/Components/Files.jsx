import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Files() {
  const location = useLocation();
  const { taskId, taskCode, taskName } = location.state || {};
  const [fileId, setFileId] = useState("");
  const [fileName, setFileName] = useState("");
  const [pdf_path, setPdfPath] = useState("");
  const [date, setDate] = useState("");
  const [fileCode, setFileCode] = useState("");
  const [rev, setRev] = useState("");
  const [subjectOfRev, setsubjectOfRev] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const fetchFiles = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const token = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getFilesbyTask/${taskId}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        setError(`Failed to fetch files: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error fetching files: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Task Information
            </h2>
            <p className="mb-2">
              <strong>Task code :</strong> <i>{taskCode}</i>
            </p>
            <p className="mb-2">
              <strong>Task name :</strong> <i>{taskName}</i>
            </p>
          </div>
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-4">Task Files</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  File code
                </th>
                <th
                  scope="col"
                  className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  File name
                </th>
                <th
                  scope="col"
                  className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Created On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-black-200 dark:divide-black-700 dark:bg-white">
              {files.map((file, index) => (
                <tr key={index}>
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    {file.fileCode}
                  </td>
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    {file.fileName}
                  </td>
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    {new Date(file.created_On).toLocaleDateString("fr-FR")}
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
