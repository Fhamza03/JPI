import React from "react";
import AdminSideBar from "../Components/AdminSideBar";
import Header from "../Components/Header";
import FormNewTask from "../Components/FormNewTask";

export default function NewTask() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewTask />
        </div>
      </div>
    </div>
  );
}
