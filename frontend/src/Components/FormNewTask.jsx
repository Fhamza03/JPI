import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import SuccessAlert from "../Components/SuccessAlert";

export default function FormNewTask() {
  const location = useLocation();
  const history = useHistory();
  const { departementId, departementCode, departementName } =
    location.state || {};
  const [taskName, setTaskName] = useState("");
  const [taskCode, setTaskCode] = useState("");
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showTaskErrorMessage, setShowTaskErrorMessage] = useState(false);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [modifiedTaskCode, setModifiedTaskCode] = useState("");
  const [modifiedTaskName, setModifiedTaskName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const filteredTasks = tasks.filter(
    (task) =>
      task.taskCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModifyTask = async (taskId, taskCode, taskName) => {
    setTaskId(taskId);
    setModifiedTaskCode(taskCode);
    setModifiedTaskName(taskName);
    setShowPrompt(true);
  };

  const confirmModification = async () => {
    setShowPrompt(false);
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const taskData = {
      taskCode: modifiedTaskCode,
      taskName: modifiedTaskName,
      taskId: taskId,
    };
    try {
      let response = await fetch(
        `http://localhost:8080/admin/updateTask/${taskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
          body: JSON.stringify(taskData),
        }
      );
      if (response.ok) {
        fetchTasks(departementId);
        console.log("Task updated successfully");
        setModifiedTaskCode("");
        setModifiedTaskName("");
      } else {
        console.log(`Problem in task ${taskId}`);
        console.error("Failed to update task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const cancelModification = () => {
    setModifiedTaskCode("");
    setModifiedTaskName("");
    setShowPrompt(false);
  };
  const handleSaveTask = async () => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");

      const base64Credentials = btoa(`${username}:${password}`);
      
      const taskData = {
        taskCode: taskCode,
        taskName: taskName,
        taskId: taskId,
      };

      const response = await fetch(
        `http://localhost:8080/admin/createTask/${departementId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      if (response.ok) {
        setShowSuccessAlert(true);
        const newTask = {
          taskCode: taskCode,
          taskName: taskName,
          taskId: taskId,
        };
        setTasks([...tasks, newTask]);
        setTaskCode("");
        setTaskName("");
      } else {
        console.error("Failed to save task:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleToggleTaskInput = () => {
    setShowTaskInput(!showTaskInput);
    setShowTaskErrorMessage(false);
  };

  useEffect(() => {
    if (departementId) {
      fetchTasks(departementId);
    }
  }, [departementId]);

  const fetchTasks = async (departementId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/getTasksByDepartement/${departementId}`,
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const username = sessionStorage.getItem("username");
      const password = sessionStorage.getItem("password");
      const base64Credentials = btoa(`${username}:${password}`);

      const response = await fetch(
        `http://localhost:8080/admin/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (response.ok) {
        fetchTasks(departementId);
        console.log("Task deleted successfully");
      } else {
        console.error("Failed to delete task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleOpenToAddTask = () => {
    setShowTaskInput(true);
    setShowTaskErrorMessage(false);
  };
  const handleAddFile = (taskId, taskCode, taskName) => {
    history.push("/admin/NewFile", {
      taskId: taskId,
      taskCode: taskCode,
      taskName: taskName,
    });
  };

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTasks.length);
  const TasksForPage = filteredTasks.slice(startIndex, endIndex);

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
          message="You have successfully added the task."
          onclose={() => setShowSuccessAlert(false)}
        />
      )}
      <div className="flex">
        <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-4">
            Task Information
          </h2>
          {showTaskInput ? (
            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="text"
                  value={taskCode || ""}
                  onChange={(e) => setTaskCode(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Task code"
                />
                <input
                  type="text"
                  value={taskName || ""}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="input-field mr-3 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Task name"
                />

                <button
                  onClick={() => {
                    if (taskCode.trim() !== "" && taskName.trim() !== "") {
                      handleSaveTask();
                    } else {
                      setShowTaskErrorMessage(true);
                    }
                  }}
                  className="middle none center mr-1 rounded-lg bg-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setShowTaskErrorMessage(false);
                    handleToggleTaskInput();
                  }}
                  className="middle none center mr-4 rounded-lg bg-red-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Close
                </button>
              </div>
              {showTaskErrorMessage &&
                (taskCode.trim() === "" || taskName.trim() === "") && (
                  <p className="text-red-500 text-sm ml-2">
                    Please enter Task code and name.
                  </p>
                )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowTaskErrorMessage(false);
                handleToggleTaskInput();
              }}
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Open to add Task
            </button>
          )}
        </div>
        {/* Department Information Card */}
        <div className="w-1/2 p-4 bg-gray-100 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-2">
            Department Information
          </h2>
          <div>
            <p>
              <strong>Departement Code:</strong> {departementCode} <br />
              <strong>Departement Name:</strong> {departementName}
            </p>
          </div>
        </div>
      </div>
      {/* Additional Card for Tasks List */}
      <div className="w-full p-4 bg-gray-100 rounded-xl shadow-xl mt-6">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-sky-700 font-bold ">
            List of Tasks
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
            {/* Input for Search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
        {/* Table for Tasks */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Task code
              </th>
              <th
                scope="col"
                className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Task name
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
            {TasksForPage.map((task, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
              >
                <td className="text-center py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {task.taskCode}
                </td>
                <td className="text-center py-3.5 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {task.taskName}
                </td>
                <td className="text-center p-4 border-b border-blue-gray-50">
                  {/* Button for Options */}
                  <button
                    onClick={() =>
                      handleModifyTask(
                        task.taskId,
                        task.taskCode,
                        task.taskName
                      )
                    }
                    className="rounded-lg bg-blue-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.taskId)}
                    className="rounded-lg bg-red-500 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleAddFile(task.taskId, task.taskCode, task.taskName)
                    }
                    className="rounded-lg bg-orange-300 py-1 px-3 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Add File
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
        {/* Conditional Rendering for Prompt */}
        {showPrompt && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
            <div className="bg-white rounded-lg p-8 w-96">
              <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
                Update Task
              </h2>
              {/* Input for Task Code */}
              <div className="mb-3">
                <label
                  htmlFor="taskCodeInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Code
                </label>
                <input
                  id="taskCodeInput"
                  type="text"
                  value={modifiedTaskCode}
                  onChange={(e) => setModifiedTaskCode(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter new task code"
                />
              </div>
              {/* Input for Task Name */}
              <div className="mb-3">
                <label
                  htmlFor="taskNameInput"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Name
                </label>
                <input
                  id="taskNameInput"
                  type="text"
                  value={modifiedTaskName}
                  onChange={(e) => setModifiedTaskName(e.target.value)}
                  className="input-field w-full h-12 rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-500 required"
                  placeholder="Enter new task name"
                />
              </div>
              {/* Buttons for Update and Cancel */}
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
