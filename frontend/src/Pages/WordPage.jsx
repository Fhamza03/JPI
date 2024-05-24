import React from "react";
import Header from "../Components/Header";
import UserSideBar from "../Components/userSideBar";
import WordEditor from "../Components/WordEditor";

export default function WordPage() {
  return (
    <div>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <WordEditor />
        </div>
      </div>
    </div>
  );
}
