import React from "react";
import AdminSideBar from "../Components/AdminSideBar";
import Header from "../Components/Header";
import UserProfile from "../Components/UserProfile";
import AdminProjectsList from "../Components/AdminProjectsList";

export default function adminDashboard() {
  return (
    <>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <AdminProjectsList/>
        </div>
      </div>
    </>
  );
}
