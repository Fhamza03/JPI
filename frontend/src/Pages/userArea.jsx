import React from "react";
import Header from "../Components/Header";
import Areas from "../Components/Areas";
import UserSideBar from "../Components/userSideBar";

export default function userArea() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <Areas />
        </div>
      </div>
    </>
  );
}
