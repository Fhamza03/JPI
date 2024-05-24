import React from "react";
import ExcelEditor from "../Components/ExcelEditor";
import Header from "../Components/Header";
import UserSideBar from "../Components/userSideBar";

export default function ExcelPage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <ExcelEditor />
        </div>
      </div>
    </div>
  );
}
