import React from "react";
import AdminSideBar from "../Components/AdminSideBar";
import Header from "../Components/Header";
import FormNewArea from '../Components/FormNewArea'


export default function NewArea() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewArea />
        </div>
      </div>
    </div>
  );
}
