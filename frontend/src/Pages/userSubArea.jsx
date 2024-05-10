import React from "react";
import Header from "../Components/Header";
import SubAreas from "../Components/SubAreas";
import UserSideBar from "../Components/userSideBar";

export default function userSubArea() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <SubAreas />
        </div>
      </div>
    </>
  );
}
