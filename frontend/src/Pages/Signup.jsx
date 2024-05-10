import React, { useState } from "react";
import EMSPI from "../images/EMSPI.png";
import LogoSignUp from "../images/LogoSignUp.jpg";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState({
    userFirstName: "",
    userLastName: "",
    username: "",
    userPassword: "",
    confirmPassword: "",
    userJobTitle: "",
    userRole: "",
    files: [],
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.userPassword !== user.confirmPassword) {
      setShowErrorAlert(true);
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userFirstName: user.userFirstName,
          userLastName: user.userLastName,
          username: user.username,
          userPassword: user.userPassword,
          userJobTitle: user.userJobTitle,
          userRole: user.userRole,
        }),
      });
      const data = await response.json();
      console.log("User created:", data);
      setShowSuccessAlert(true);
      setUser({
        userFirstName: "",
        userLastName: "",
        username: "",
        userPassword: "",
        confirmPassword: "",
        userJobTitle: "",
        userRole: "",
        files: [],
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      {/* component */}
      <div className="flex h-screen">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <img className="w-full h-full object-cover" src={LogoSignUp} alt="" />
        </div>
        {/* Right Pane */}
        <div className="w-full bg-sky-800 lg:w-1/2 flex items-center justify-center bg-opacity-30 backdrop-filter backdrop-blur-lg">
          <div className="w-full lg:w-2/3 flex items-center justify-center">
            <div className="max-w-4xl w-full p-8 rounded-lg border border-gray-300 bg-white shadow-2xl">
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center">
                  <img
                    className="w-32 h-auto lg:w-33 lg:h-auto"
                    src={EMSPI}
                    alt=""
                  />
                  <div className="mx-4 border-l-4 border-gray-400 dark:border-gray-600 h-20"></div>
                  <span className="text-dark dark:text-gray-400 text-3xl lg:text-4xl font-bold">
                    Create Your Account
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-2">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="First Name"
                        name="userFirstName"
                        value={user.userFirstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-2">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Last Name"
                        name="userLastName"
                        value={user.userLastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Job Title"
                        name="userJobTitle"
                        value={user.userJobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Email"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Password"
                        name="userPassword"
                        value={user.userPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-2">
                    <label>
                      <input
                        type="radio"
                        value="USER"
                        className="peer hidden"
                        name="userRole"
                        onChange={handleChange}
                      />
                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                        <h2 className="font-medium text-gray-700">
                          I'm a user
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                  <div className="w-1/2 px-3 mb-2">
                    <label>
                      <input
                        type="radio"
                        value="ADMIN"
                        className="peer hidden"
                        name="userRole"
                        onChange={handleChange}
                      />
                      <div className="hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500">
                        <h2 className="font-medium text-gray-700">
                          I'm an admin
                        </h2>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-9 h-9 text-blue-600 invisible group-[.peer:checked+&]:visible"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-0">
                    <button className="block w-full mb-2 max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold text-center">
                      Sign up
                    </button>
                    <p className="text-center">
                      Already have an account?{" "}
                      <Link className="text-sky-600 hover:underline" to="/">
                        Login here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>

              {/* Success alert */}
              {showSuccessAlert && (
                <div
                  aria-live="assertive"
                  className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                >
                  <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-gray-900">
                              Successfully saved!
                            </p>
                          </div>
                          <div className="ml-4 flex flex-shrink-0">
                            <button
                              type="button"
                              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setShowSuccessAlert(false)}
                            >
                              <span className="sr-only">Close</span>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error alert */}
              {showErrorAlert && (
                <div
                  aria-live="assertive"
                  className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                >
                  <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-6 w-6 text-red-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                          <div className="ml-3 w-0 flex-1 pt-0.5">
                            <p className="text-sm font-medium text-gray-900">
                              Passwords do not match!
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Please make sure your passwords match.
                            </p>
                          </div>
                          <div className="ml-4 flex flex-shrink-0">
                            <button
                              type="button"
                              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setShowErrorAlert(false)}
                            >
                              <span className="sr-only">Close</span>
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 9.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M11.707 9.293a1 1 0 00-1.414 0l-4 4a1 1 0 101.414 1.414l4-4a1 1 0 000-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
