import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import JpiLogo from "../images/JpiLogo.png";
import LogoSignUp from "../images/LogoSignUp.jpg";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    userPassword: "",
  });

  const history = useHistory(); // Get history object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request with credentials
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        console.log("Login successful");
        // Retrieve role from response text
        const role = await response.text();
        if (role === "ROLE_ADMIN") {
          // Redirect to admin page
          history.push("/admin");
        } else if (role === "ROLE_USER") {
          // Redirect to user page
          history.push("/user");
        } else {
          // Invalid role
          console.error("Invalid role:", role);
        }
      } else {
        console.error("Login failed:", await response.text());
        // Handle failed login, e.g., display error message
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error, e.g., display error message
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <img className="w-full h-full object-cover" src={LogoSignUp} alt="" />
      </div>
      {/* Right Pane */}
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <img
            className="w-auto h-48 lg:h-48 text-center"
            src={JpiLogo}
            alt=""
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg outline-none focus:border-indigo-500"
                placeholder="Username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
              <input
                type="password"
                className="border border-gray-300 p-2 rounded-lg outline-none focus:border-indigo-500"
                placeholder="Password"
                name="userPassword"
                value={credentials.userPassword}
                onChange={handleChange}
              />
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <a href="/signup" className="text-indigo-500 hover:underline">
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}