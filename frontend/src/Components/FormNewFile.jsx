import React, { useState } from "react";
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

  // Assuming you have the user ID stored in sessionStorage
  const userId = sessionStorage.getItem("userId");

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const handleAddFile = async (e) => {
    e.preventDefault();

    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      // Check for null values before sending data
      if (!fileName || !fileCode || !rev || !subjectOfRev) {
        console.error("Please fill in all fields");
        return;
      }

      const fileData = {
        fileName,
        fileCode,
        rev,
        subjectOfRev,
        pdf_path,
        created_On: formatDate(date),
        userId: userId,
      };

      const response = await fetch(
        `http://localhost:8080/admin/createFile/${taskId}`,
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
      } else {
        console.error("Failed to save file:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
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
        </div>
      </div>
    </div>
  );
}
