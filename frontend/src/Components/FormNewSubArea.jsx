import React from "react";
import { useLocation } from "react-router-dom";

export default function FormNewSubArea() {
  const location = useLocation();
  const { areaCode, areaName } = location.state || {};
  return (
    <div>
      <h1>New Sub Area</h1>
      <p>Area Code: {areaCode}</p>
      <p>Area Name: {areaName}</p>
    </div>
  );
}
