import React from 'react'
import Files from "../Components/Files";
import Header from "../Components/Header";
import UserSideBar from "../Components/userSideBar";

export default function userFiles() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <Files/>
        </div>
      </div>
    </>
  )
}
