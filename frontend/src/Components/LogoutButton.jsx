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
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
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
