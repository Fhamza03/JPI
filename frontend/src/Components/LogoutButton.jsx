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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
