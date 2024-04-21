import React from "react";
import { useLocation } from "react-router-dom";

export default function FormNewArea(props) {
  const location = useLocation();
  const { databaseInfo } = location.state || {};

  return (
    <div className="flex mt-11 mr-4 ml-4">
      <div className="w-1/2 p-4 bg-gray-100 mr-10 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
          Area Information
        </h2>
      </div>

      <div className="w-1/2 p-4 bg-gray-100 mr-3 rounded-xl shadow-xl">
        <h2 className="text-2xl text-sky-700 font-bold mb-4 font-serif">
          Database Information
        </h2>
        <div>
          <p>
            <strong>Database Type:</strong> {databaseInfo}
          </p>
        </div>
      </div>
    </div>
  );
}
