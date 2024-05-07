import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FormNewFile() {
  const location = useLocation();
  const { taskId, taskCode, taskName } = location.state || {};
  const [fileName, setFileName] = useState("");
  const [pdf_path, setPdfPath] = useState("");
  const [date, setDate] = useState("");
  const [fileCode, setFileCode] = useState("");
  const [rev, setRev] = useState("");
  const [subjectOfRev, setsubjectOfRev] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [fileId, setFileId] = useState("");
  const [modifiedFileName, setModifiedFileName] = useState("");
  const [modifiedFileCode, setModifiedFileCode] = useState("");
  const [modifiedFileRevision, setModifiedFileRevision] = useState("");
  const [modifiedFileSubject, setModifiedFileSubject] = useState("");
  const [modifiedFileCreated, setModifiedFileCreated] = useState("");
  const [modifiedPdf_path, setModifiedPdf_Path] = useState(null);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const handleAddFile = async (e) => {
    e.preventDefault();

    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const userId = sessionStorage.getItem("userId");
      const taskId = location.state?.taskId; // Extract taskId from location state

      const base64Credentials = btoa(`${username}:${password}`);

      // Check for null values before sending data
      if (
        !fileName ||
        !fileCode ||
        !rev ||
        !subjectOfRev ||
        !userId ||
        !taskId
      ) {
        console.error(
          "Please fill in all fields, ensure you are logged in, and provide a valid taskId"
        );
        return;
      }

      const fileData = {
        fileName,
        fileCode,
        rev,
        subjectOfRev,
        pdf_path,
        created_On: formatDate(date),
      };

      const response = await fetch(
        `http://localhost:8080/admin/createFile/${taskId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(fileData),
        }
      );

      if (response.ok) {
        console.log("File saved successfully");
        console.log("userId:", userId);

        fetchFiles();
      } else {
        console.error("Failed to save file:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
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

  const handleDelete = async (fileId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const token = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/admin/deleteFile/${fileId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("File deleted successfully");
        fetchFiles();
      } else {
        console.error("Failed to delete file:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleModifyFile = (
    fileId,
    fileName,
    fileCode,
    rev,
    pdf_path,
    subjectOfRev,
    created_On
  ) => {
    setFileId(fileId);
    setModifiedFileName(fileName);
    setModifiedFileCode(fileCode);
    setModifiedFileRevision(rev);
    setModifiedPdf_Path(pdf_path);
    setModifiedFileSubject(subjectOfRev);
    setModifiedFileCreated(formatDate(created_On));
    setShowPrompt(true);
  };

  const confirmModification = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const userId = sessionStorage.getItem("userId");
      const token = btoa(`${username}:${password}`);

      const fileData = {
        fileName: modifiedFileName,
        fileCode: modifiedFileCode,
        rev: modifiedFileRevision,
        subjectOfRev: modifiedFileSubject,
        pdf_path: modifiedPdf_path,
        created_On: formatDate(modifiedFileCreated),
      };

      const response = await fetch(
        `http://localhost:8080/admin/updateFile/${fileId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
          body: JSON.stringify(fileData),
        }
      );

      if (response.ok) {
        console.log("File updated successfully");
        fetchFiles();
      } else {
        console.error("Failed to update file:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating file:", error);
    }

    setShowPrompt(false);
    setModifiedFileName("");
    setModifiedFileCode("");
    setModifiedFileRevision("");
    setModifiedFileSubject("");
    setModifiedFileCreated("");
  };

  const cancelModification = () => {
    setShowPrompt(false);
    setModifiedFileName("");
    setModifiedFileCode("");
    setModifiedFileRevision("");
    setModifiedFileSubject("");
    setModifiedFileCreated("");
  };

  return (
    <div className="flex flex-col mt-11 mr-4 ml-4">
      <div className="flex">
        <div className="w-1/3 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
            File Information
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="FileName"
                className="block text-gray-700 font-bold mb-2"
              >
                File Name
              </label>
              <input
                type="text"
                id="FileName"
                name="FileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="FileCode"
                className="block text-gray-700 font-bold mb-2"
              >
                File Code
              </label>
              <input
                type="text"
                id="FileCode"
                name="FileCode"
                value={fileCode}
                onChange={(e) => setFileCode(e.target.value)}
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Revesion"
                className="block text-gray-700 font-bold mb-2"
              >
                Revesion
              </label>
              <input
                type="text"
                id="Revesion"
                name="Revesion"
                value={rev}
                onChange={(e) => setRev(e.target.value)}
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Subject"
                className="block text-gray-700 font-bold mb-2"
              >
                Subject of revesion
              </label>
              <input
                type="text"
                id="Subject"
                name="Subject"
                value={subjectOfRev}
                onChange={(e) => setsubjectOfRev(e.target.value)}
                className="input-field mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Upload"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload file
              </label>
              <link
                rel="stylesheet"
                href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
              />
              <input
                type="file"
                id="Upload"
                name="Upload"
                value={pdf_path}
                onChange={(e) => setPdfPath(e.target.value)}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 font-bold mb-2"
              >
                Created On
              </label>
              <input
                className="w-full rounded-lg"
                id="date"
                placeholder="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddFile}
            >
              Save
            </button>
          </form>
        </div>
        <div className="w-2/3 p-4 bg-gray-100 rounded-xl shadow-xl">
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
            Task Information
          </h2>
          <div>
            <p>
              <strong>Task name:</strong> {taskName}
            </p>
            <p>
              <strong>Task code:</strong> {taskCode}
            </p>
          </div>
          <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif mt-3">
            Files list
          </h2>
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
                <th
                  scope="col"
                  className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  Options
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
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    <button
                      className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() => handleDelete(file.fileId)} // Add onClick handler for delete
                    >
                      Delete
                    </button>
                    <button
                      className="rounded-lg bg-blue-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() =>
                        handleModifyFile(
                          file.fileId,
                          file.fileName,
                          file.fileCode,
                          file.rev,
                          file.pdf_path,
                          file.subjectOfRev,
                          file.created_On
                        )
                      }
                    >
                      Modify
                    </button>
                    <button className="rounded-lg bg-green-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <div className="text-red-500">{error}</div>}
        </div>
        {showPrompt && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
                Update File Information
              </h2>
              <div className="flex mb-3">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="modifiedFileName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    File Name
                  </label>
                  <input
                    id="modifiedFileName"
                    type="text"
                    value={modifiedFileName}
                    onChange={(e) => setModifiedFileName(e.target.value)}
                    className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                    placeholder="Enter modified file name"
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="modifiedFileCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    File Code
                  </label>
                  <input
                    id="modifiedFileCode"
                    type="text"
                    value={modifiedFileCode}
                    onChange={(e) => setModifiedFileCode(e.target.value)}
                    className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                    placeholder="Enter modified file code"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="modifiedFileRevision"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Revision
                </label>
                <input
                  id="modifiedFileRevision"
                  type="text"
                  value={modifiedFileRevision}
                  onChange={(e) => setModifiedFileRevision(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter modified file Revision"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="modifiedFileSubject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject of Revision
                </label>
                <input
                  id="modifiedFileSubject"
                  type="text"
                  value={modifiedFileSubject}
                  onChange={(e) => setModifiedFileSubject(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter modified file Subject of revision"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="Upload"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="Upload"
                  name="Upload"
                  onChange={(e) => setModifiedPdf_Path(e.target.value)}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="modifiedFileCreated"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Created On
                </label>
                <input
                  id="modifiedFileCreated"
                  type="date"
                  value={modifiedFileCreated}
                  onChange={(e) => setModifiedFileCreated(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
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
