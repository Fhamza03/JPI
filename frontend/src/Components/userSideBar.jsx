import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function userSideBar() {
  return (
    <>
      <aside className="flex flex-col w-64 h-screen px-5 py-7 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 bg-slate-200">
        <div className="flex flex-col justify-between flex-1">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                Navigation
              </label>

              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="/user/userDashboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 88 88"
                  className="w-6 h-6 text-gray-800 dark:text-white"
                >
                  <path
                    style={{ fill: "#1e1f21" }}
                    d="M44 47h3v6h-3zM49 47h3v6h-3zM48 58.438 50.865 55h-5.73L48 58.438zM48 19a12 12 0 0 0-4.615 23.078A1 1 0 0 1 44 43v2h3v-4.586l-3.707-3.707a1 1 0 0 1 1.414-1.414L48 38.586l3.293-3.293a1 1 0 0 1 1.414 1.414L49 40.414V45h3v-2a1 1 0 0 1 .615-.922A12 12 0 0 0 48 19z"
                  />
                  <path
                    d="M55.24 69.2a33.002 33.002 0 1 0-40.239-32.485L7.149 49.476A1 1 0 0 0 8 51h7v10a9.01 9.01 0 0 0 9 9h12a1 1 0 0 1 0 2H26v11a1 1 0 0 0 1 1h36a1 1 0 0 0 1-1V68.12a34.586 34.586 0 0 1-8.32 3.03 1 1 0 1 1-.44-1.95zm2.47-23.07a1.155 1.155 0 0 1-.33.21 1 1 0 0 1-.38.08 1.004 1.004 0 0 1-.71-1.71.998.998 0 0 1 1.09-.21 1.142 1.142 0 0 1 .33.21 1.038 1.038 0 0 1 .21.33.998.998 0 0 1 .08.38 1.054 1.054 0 0 1-.29.71zm3.11-2.5a.977.977 0 0 1-.71.3.943.943 0 0 1-.7-.29.997.997 0 1 1 1.41-.01zm2.59-3.32a1.006 1.006 0 0 1-.86.48.97.97 0 0 1-.51-.15.986.986 0 0 1-.34-1.37 1 1 0 1 1 1.71 1.04zm1.75-3.84a1.008 1.008 0 0 1-.96.69 1.021 1.021 0 0 1-.3-.04 1.002 1.002 0 1 1 1.25-.65zm-.2-3.22h-.08a1.036 1.036 0 1 1 .08 0zm.81-5.13a.99.99 0 0 1-.83 1.14.864.864 0 0 1-.16.02.989.989 0 0 1-.98-.85v.01-.01.001a.997.997 0 1 1 1.97-.311zm-2.46-4.6a1.002 1.002 0 0 1 .77 1.85 1.08 1.08 0 0 1-.39.08 1.004 1.004 0 0 1-.38-1.93zm-2.17-3.35a1.002 1.002 0 1 1 1.18 1.62.96.96 0 0 1-.58.19.986.986 0 0 1-.81-.41 1.003 1.003 0 0 1 .21-1.4zm-2.87-2.76a.997.997 0 0 1 1.41-.11 1 1 0 1 1-1.41.11zm-3.44-2.02a1 1 0 1 1 .89 1.46 1.067 1.067 0 0 1-.46-.11 1.004 1.004 0 0 1-.43-1.35zm-3.82-1.15a1.002 1.002 0 1 1 .97 1.23.959.959 0 0 1-.23-.03.996.996 0 0 1-.74-1.2zM48.03 13a1 1 0 1 1-1 1 1.003 1.003 0 0 1 1-1zm-4.18.48a1 1 0 1 1 .45 1.95.85.85 0 0 1-.23.03 1.003 1.003 0 0 1-.22-1.98zm-3.97 1.45a1 1 0 1 1 .91 1.78.936.936 0 0 1-.45.11 1 1 0 0 1-.46-1.89zm-3.51 2.33a1 1 0 1 1 1.29 1.53.952.952 0 0 1-.64.23.996.996 0 0 1-.65-1.76zm-2.88 3.08a1.005 1.005 0 0 1 1.62 1.19h-.01a.998.998 0 0 1-.8.4.967.967 0 0 1-.59-.19 1.006 1.006 0 0 1-.22-1.4zM31.41 24a1 1 0 1 1 .92 1.39.915.915 0 0 1-.39-.08.992.992 0 0 1-.53-1.31zm-.02 3.23a1.002 1.002 0 0 1-.16 1.99.95.95 0 0 1-.17-.02.999.999 0 1 1 .33-1.97zm-1.35 5.03a1.002 1.002 0 1 1 1.07.93h-.07a1.003 1.003 0 0 1-1-.93zm1.74 4.85a1.007 1.007 0 1 1 .3-.05 1.053 1.053 0 0 1-.3.05zm2.15 3.49a1.054 1.054 0 0 1-.51.14 1.001 1.001 0 1 1 .85-1.52 1.015 1.015 0 0 1-.34 1.38zm2.62 3a1 1 0 1 1-1.4-1.43 1 1 0 0 1 1.4 1.43zm3.16 2.53a1.004 1.004 0 0 1-1.42-1.42 1.14 1.14 0 0 1 .33-.21 1 1 0 0 1 .76 0 1.025 1.025 0 0 1 .33.21 1.014 1.014 0 0 1 0 1.42zM54 43.65V54a.995.995 0 0 1-.074.365.971.971 0 0 1-.067.116.991.991 0 0 1-.09.16l-5 6a1 1 0 0 1-1.537 0l-5-6a.991.991 0 0 1-.091-.16.971.971 0 0 1-.067-.116A.995.995 0 0 1 42 54V43.65a14 14 0 1 1 12 0z"
                    style={{ fill: "#1e1f21" }}
                  />
                </svg>
                <span className="mx-2 text-sm font-medium">Project</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="#"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
                </svg>

                <span className="mx-2 text-sm font-medium">Databases</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="#"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Areas</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="#"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 5a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L15.249 6H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v-5a3 3 0 0 0-3-3h-3.22l-1.14-1.682A3 3 0 0 0 9.157 6H6V5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9a2 2 0 0 1 2-2h4.157a2 2 0 0 1 1.656.879L12.249 10H3V9Zm0 3v7a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-7H3Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Sub-Areas</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="#"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Departements</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="#"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Tasks</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="#"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="mx-2 text-sm font-medium">Files</span>
              </Link>
            </div>
            <div>
              <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                Readers
              </label>
              <Link
                className=" mt-4 mb-3 flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="/user/WordFile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width={24}
                  height={24}
                  viewBox="0 0 50 50"
                >
                  <path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 44 13 L 44 15 L 32 15 L 32 20 L 44 20 L 44 22 L 32 22 L 32 27 L 44 27 L 44 29 L 32 29 L 32 35 L 44 35 L 44 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 4.625 15.65625 L 8.1875 15.65625 L 10.21875 28.09375 C 10.308594 28.621094 10.367188 29.355469 10.40625 30.25 L 10.46875 30.25 C 10.496094 29.582031 10.613281 28.855469 10.78125 28.0625 L 13.40625 15.65625 L 16.90625 15.65625 L 19.28125 28.21875 C 19.367188 28.679688 19.433594 29.339844 19.5 30.21875 L 19.53125 30.21875 C 19.558594 29.53125 19.632813 28.828125 19.75 28.125 L 21.75 15.65625 L 25.0625 15.65625 L 21.21875 34.34375 L 17.59375 34.34375 L 15.1875 22.375 C 15.058594 21.75 14.996094 21.023438 14.96875 20.25 L 14.9375 20.25 C 14.875 21.101563 14.769531 21.824219 14.65625 22.375 L 12.1875 34.34375 L 8.4375 34.34375 Z" />
                </svg>
                <span className="mx-2 text-sm font-medium">Word Reader</span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                to="/user/ExcelFile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width={24}
                  height={24}
                  viewBox="0 0 50 50"
                >
                  <path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z" />
                </svg>

                <span className="mx-2 text-sm font-medium">Excel Reader</span>
              </Link>
            </div>
          </nav>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase dark:text-gray-400">
            Account
          </label>
          <div className="mt-2">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}
