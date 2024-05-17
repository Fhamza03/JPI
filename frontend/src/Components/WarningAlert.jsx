import React from "react";

export default function WarningAlert({ message, onclose }) {
  return (
    <div
      className="absolute right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 mr-7 mt-3 rounded shadow-md"
      role="alert"
    >
      <strong className="font-bold">Warning!</strong>
      <br />
      <span className="block sm:inline"> {message}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-2 mt-2"
        onClick={onclose}
      >
        <svg
          className="fill-current h-4 w-4 text-red-500 cursor-pointer"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            fillRule="evenodd"
            d="M14.348 5.652a.5.5 0 00-.708 0L10 9.293 6.36 5.652a.5.5 0 00-.708.708L9.293 10l-3.64 3.64a.5.5 0 10.708.708L10 10.707l3.64 3.64a.5.5 0 00.708-.708L10.707 10l3.64-3.64a.5.5 0 000-.708z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
}
