import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function Tasks() {
  const location = useLocation();
  const history = useHistory();
  const { departementId, departementCode, departementName } =
    location.state || {};
  const [taskName, setTaskName] = useState("");
  const [taskCode, setTaskCode] = useState("");
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.taskCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleFile = (taskId, taskCode, taskName) => {
    history.push("/user/Files", {
      taskId: taskId,
      taskCode: taskCode,
      taskName: taskName,
    });
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="max-w-screen-lg w-full">
        <div className="flex justify-between">
          <div className="w-1/3 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
              Department Information
            </h2>
            <p className="mb-2">
              <strong>Department code :</strong> <i>{departementCode}</i>
            </p>
            <p className="mb-2">
              <strong>Department name :</strong> <i>{departementName}</i>
            </p>
          </div>
          <div className="w-2/3 bg-white border border-gray-300 rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-4">Department Tasks</h2>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Task Code
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Task Name
                  </th>
                  <th
                    scope="col"
                    className="text-center py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Files
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
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
                      <button
                        onClick={() =>
                          handleFile(task.taskId, task.taskCode, task.taskName)
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
          </div>
        </div>
      </div>
    </div>
  );
}
