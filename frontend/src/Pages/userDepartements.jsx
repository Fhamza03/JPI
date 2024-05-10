import React from "react";
import Header from "../Components/Header";
import Departements from "../Components/Departements";
import UserSideBar from "../Components/userSideBar";

export default function userDepartements() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <Departements />
        </div>
      </div>
    </>
  );
}
