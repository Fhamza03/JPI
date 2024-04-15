import React from "react";
import AdminSideBar from "../Components/AdminSideBar";
import Header from "../Components/Header";
import FormNewProject from "../Components/FormNewProject";

export default function NewProject() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewProject />
        </div>
      </div>
    </div>
  );
}
