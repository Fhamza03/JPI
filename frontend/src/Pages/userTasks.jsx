import React from "react";
import Header from "../Components/Header";
import Tasks from "../Components/tasks";
import UserSideBar from "../Components/userSideBar";

export default function userTasks() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <Tasks/>
        </div>
      </div>
    </>
  );
}
