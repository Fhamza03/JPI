import React from "react";
import { useLocation } from "react-router-dom";

export default function FormNewTask() {
  const location = useLocation();
  const { departementId, departementCode, departementName } =
    location.state || {};
  return (
    <div>
      <h1>ID: {departementId}</h1>
      <h1>NAME: {departementName}</h1>
      <h1> CODE: {departementCode}</h1>
    </div>
  );
}
