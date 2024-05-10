import React from "react";
import Header from "../Components/Header";
import Projects from "../Components/Projects";
import UserSideBar from "../Components/userSideBar";

export default function userDashboard() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <Projects />
        </div>
      </div>
    </>
  );
}
