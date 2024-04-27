import React from "react";
import FormNewFile from "../Components/FormNewFile";
import AdminSideBar from "../Components/AdminSideBar";
import Header from "../Components/Header";

export default function NewFile() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewFile />
        </div>
      </div>
    </div>
  );
}
