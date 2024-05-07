import React from "react";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <>
      {/* component */}
      <nav className="bg-sky-700 w-full flex relative justify-between items-center mx-auto px-8 h-20">
        {/* logo */}
        <div className="inline-flex">
          <h1 className="text-sm text-xl font-sans">
            <b className="text-white">
              Engineering Modular System Project Information
            </b>
          </h1>
        </div>
        {/* end logo */}
        {/* User profile */}
        <div className="flex-initial">
          <UserProfile />
        </div>
        {/* end user profile */}
      </nav>
    </>
  );
};

export default Header;
