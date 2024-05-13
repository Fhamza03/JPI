import React from "react";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/logoutUser", {
        method: "POST",
      });
      sessionStorage.clear();
      history.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <button
        tabIndex={-1}
        role="menuitem"
        className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        onClick={handleLogout}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M10.95 15.84h-11V.17h11v3.88h-1V1.17h-9v13.67h9v-2.83h1v3.83z" />
          <path d="M5 8h6v1H5zM11 5.96l4.4 2.54-4.4 2.54V5.96z" />
        </svg>

        <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
          Sign Out
        </p>
      </button>
    </div>
  );
};

export default LogoutButton;
