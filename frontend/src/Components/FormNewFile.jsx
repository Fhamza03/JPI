import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SuccessAlert from "../Components/SuccessAlert";
import WarningAlert from "../Components/WarningAlert";

export default function FormNewFile() {
  const location = useLocation();
  const { taskId, taskCode, taskName } = location.state || {};
  const [fileName, setFileName] = useState("");
  const [pdf_path, setPdfPath] = useState("");
  const [date, setDate] = useState("");
  const [fileCode, setFileCode] = useState("");
  const [rev, setRev] = useState("");
  const [subjectOfRev, setSubjectOfRev] = useState("");
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
      const taskId = location.state?.taskId;

      const base64Credentials = btoa(`${username}:${password}`);

      if (
        !fileName ||
        !fileCode ||
        !rev ||
        !subjectOfRev ||
        !userId ||
        !taskId
      ) {
        setShowWarningAlert(true)
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
        `http://localhost:8080/createFile/${taskId}/${userId}`,
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
        setShowSuccessAlert(true);
        setFileName("");
        setFileCode("");
        setRev("");
        setSubjectOfRev("");
        setDate("");
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
        console.log(taskId)
        setError(`Failed to fetch files: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error fetching files: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [files]);

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
        `http://localhost:8080/updateFile/${fileId}/${userId}`,
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

  const filteredFiles = files.filter(
    (file) =>
      file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.fileCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFiles.length);
  const FilesForPage = filteredFiles.slice(startIndex, endIndex);

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
          message="You have successfully added the file."
          onclose={() => setShowSuccessAlert(false)}
        />
      )}
      {showWarningAlert && (
        <WarningAlert
          message="Please fill in all fields."
          onclose={() => setShowWarningAlert(false)}
        />
      )}
      <div className="flex">
        <div className="w-1/3 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
          <h2 className="text-2xl text-sky-700 font-bold mb-4">
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
                onChange={(e) => setSubjectOfRev(e.target.value)}
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
          <h2 className="text-2xl text-sky-700 font-bold mb-4">
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 mt-3">
              List of Files
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
              {FilesForPage.map((file, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                >
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    {file.fileCode}
                  </td>
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    {file.fileName}
                  </td>
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    {formatDate(file.created_On)}
                  </td>
                  <td className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                    <button
                      className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                      onClick={() => handleDelete(file.fileId)}
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
