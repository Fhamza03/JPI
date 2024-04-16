import React from "react";
import AdminSideBar from "../Components/AdminSideBar";
import Header from "../Components/Header";
import FormNewDatabase from "../Components/FormNewDatabase";

export default function NewDatabase() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewDatabase />
        </div>
      </div>
    </div>
  );
}
