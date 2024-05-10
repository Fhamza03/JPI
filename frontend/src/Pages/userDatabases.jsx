import React from "react";
import Header from "../Components/Header";
import Databases from "../Components/Databases";
import UserSideBar from "../Components/userSideBar";

export default function userDatabases() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <Databases />
        </div>
      </div>
    </>
  );
}
