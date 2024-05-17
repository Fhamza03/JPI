import React, { useState, useEffect, useRef } from "react";

export default function SuccessAlert({ message, onclose }) {
  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      const alertWidth = alertRef.current.offsetWidth;
      if (alertWidth > 400) {
        alertRef.current.style.width = "400px";
      }
    }
  }, []);

  return (
    <div
      className="absolute  right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 mr-7 mt-3 rounded shadow-md"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <br />
      <span className="block sm:inline"> {message}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-2 mt-2"
        onClick={onclose}
      >
        <svg
          className="fill-current h-4 w-4 text-green-500 cursor-pointer"
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
