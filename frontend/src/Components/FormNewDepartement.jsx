import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function FormNewDepartement() {
  const location = useLocation();
  const { subAreaId, subAreaCode, subAreaName } = location.state || {};
  return (
    <div>
      <h1>id : </h1>
      {subAreaId}
      <h1>name : </h1>
      {subAreaName}
      <h1>code : </h1>
      {subAreaCode}
    </div>
  );
}
