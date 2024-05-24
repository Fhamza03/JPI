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
        className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md  pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
        onClick={handleLogout}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
          />
        </svg>

        <p className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">
          Sign Out
        </p>
      </button>
    </div>
  );
};

export default LogoutButton;
