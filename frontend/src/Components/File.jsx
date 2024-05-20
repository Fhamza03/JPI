import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function File() {
  const location = useLocation();
  const {
    fileId,
    // fileName,
    // fileCode,
    // rev,
    // pdf_path,
    // subjectOfRev,
    // created_On,
    project,
    taskId,
  } = location.state || {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hour = String(currentDate.getHours()).padStart(2, "0");
  const minute = String(currentDate.getMinutes()).padStart(2, "0");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [revision, setRevision] = useState("");
  const [subject, setSubject] = useState("");
  const [created, setCreated] = useState(new Date());
  const [path, setPath] = useState("");
  const [userModifiedFile, setUserModifiedFile] = useState(
    sessionStorage.getItem("username")
  );
  const [showPrompt, setShowPrompt] = useState(false);
  const [fileData, setFileData] = useState(null);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const ShowPrompt = () => {
    setShowPrompt(true);
  };

  const cancelModification = () => {
    setShowPrompt(false);
  };

  const confirmModification = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const userId = sessionStorage.getItem("userId");
      const token = btoa(`${username}:${password}`);

      const fileData = {
        fileName: name,
        fileCode: code,
        rev: revision,
        subjectOfRev: subject,
        pdf_path: path,
        created_On: formatDate(created),
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
        await fetchFile(fileId);
        console.log("File updated successfully");
        setShowPrompt(false);
      } else {
        console.error("Failed to update file:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };

  // const ChangeInfo = () => {
  //   setName(name);
  //   setCode(code);
  //   setRevision(revision);
  //   setSubject(subject);
  //   setCreated(created);
  //   setPath(path);
  //   setShowPrompt(false);
  // };

  const fetchFile = async (fileId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const token = btoa(`${username}:${password}`);

      const response = await fetch(`http://localhost:8080/getFile/${fileId}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Fetched file data:", data);
        setFileData(data);
        setCode(data.fileCode);
        setName(data.fileName);
        setCreated(data.created_On);
        setPath(data.pdf_path);
        setRevision(data.rev);
        setSubject(data.subjectOfRev);
        setUserModifiedFile(sessionStorage.getItem("username"));
        console.log("File fetched successfully");
      } else {
        console.error(`Failed to fetch file: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching file: ${error.message}`);
    }
  };

  useEffect(() => {
    console.log(`Fetching file with the id ${fileId} ...`);
    fetchFile(fileId);
  }, [fileId]);
  return (
    <div>
      <div className="card bg-white border border-gray-300 rounded-lg m-4 pt-4 pb-5 pr-2 pl-2 shadow-xl">
        <h2 className="text-xl text-sky-700 font-bold mb-5 ml-4">
          Project Information
        </h2>
        <div className="flex justify-between mb-2 bg-slate-200 rounded-lg">
          <p className="ml-4 mt-2 mb-2">
            <strong>Project Code :</strong> <span>{project.projectCode}</span>
          </p>
          <p className="mt-2 mb-2">
            <strong>Project Name :</strong> <span>{project.projectName}</span>
          </p>
          <p className="mr-4 mt-2 mb-2">
            <strong>Location :</strong> <span>{project.location}</span>
          </p>
        </div>
        <div className="flex justify-between mb-2 rounded-lg">
          <p className="ml-4 mt-2 mb-2">
            <strong>Lead Office :</strong> <span> {project.leadOffice}</span>
          </p>
          <p className=" mt-2 mb-2">
            <strong>Lead Server :</strong> <span>{project.leadServer}</span>
          </p>
          <p className="mr-4 mt-2 mb-2">
            <strong>Line of business :</strong>{" "}
            <span>{project.lineOfBusiness}</span>
          </p>
        </div>
        <div className="flex justify-between bg-slate-200 rounded-lg">
          <p className="ml-4 mt-2 mb-2">
            <strong>Server Name:</strong> <span>{project.serverName}</span>
          </p>
          <p className="mt-2 mb-2">
            <strong>Database Location :</strong>{" "}
            <span> {project.databaseLocation}</span>
          </p>
          <p className="mr-4 mt-2 mb-2">
            <strong>Client :</strong> <span> {project.client}</span>
          </p>
        </div>
      </div>
      <div className="card bg-white border border-gray-300 rounded-lg m-4 pt-4 pb-5 pr-2 pl-2 shadow-xl">
        <h2 className="text-xl text-sky-700 font-bold mb-5 ml-4">
          File Information
        </h2>
        <div>
          {fileData && (
            <div className="card bg-white border border-gray-300 rounded-lg m-4 pt-4 pb-5 pr-2 pl-2 shadow-xl">
              <h2 className="text-xl text-sky-700 font-bold mb-5 ml-4">
                File Information
              </h2>
              <div className="flex justify-between mb-2 bg-slate-200 rounded-lg">
                <p className="ml-4 mt-2 mb-2">
                  <strong>File Code :</strong> <span>{fileData.fileCode}</span>
                </p>
                <p className="mt-2 mb-2">
                  <strong>File Name :</strong> <span>{fileData.fileName}</span>
                </p>
                <p className="mr-4 mt-2 mb-2">
                  <strong>Revision :</strong> <span>{fileData.rev}</span>
                </p>
              </div>
              <div className="flex justify-between mb-2 rounded-lg">
                <p className="mt-2 mb-2 ml-4">
                  <strong>Subject of Revision :</strong>{" "}
                  <span>{fileData.subjectOfRev}</span>
                </p>
                <p className="mt-2 mb-2">
                  <strong>Created on :</strong>{" "}
                  <span>{fileData.created_On}</span>
                </p>
                <p className="mt-2 mb-2 mr-4">
                  <strong>Created by :</strong>{" "}
                  <span>{fileData.createdBy}</span>
                </p>
              </div>
              <div className="flex justify-between mb-2 bg-slate-200 rounded-lg">
                <p className="ml-4 mt-2 mb-2">
                  <strong>Modified By :</strong>{" "}
                  <span>{fileData.modifiedBy}</span>
                </p>
                <p className="mr-4 mt-2 mb-2">
                  <strong>Modified on :</strong>{" "}
                  <span>{fileData.modifiedOn}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end mr-10">
        <button
          onClick={() => ShowPrompt()}
          className="rounded-lg bg-sky-700 py-3 px-7 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Update
        </button>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                value={revision}
                onChange={(e) => setRevision(e.target.value)}
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
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
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
                onChange={(e) => setPath(e.target.value)}
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
                value={formatDate(created)}
                onChange={(e) => setCreated(e.target.value)}
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
  );
}
