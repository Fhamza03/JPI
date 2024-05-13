import React from "react";
import UserProfile from "./UserProfile";
import EMSPI from "../images/EMSPI.png";

const Header = () => {
  return (
    <>
      {/* component */}
      <nav className="relative">
        {/* Sky blue color block */}
        <div className="bg-sky-800 w-full h-12"></div>

        {/* Logo */}
        <div className="absolute left-0 top-0 flex items-center ml-4">
          <img src={EMSPI} alt="Logo" className="w-24 h-auto" />
          <p className="text-white text-2xl font-semibold tracking-wide">
            {" "}
            Engineering Modular System Project Information
          </p>
        </div>

        {/* Black color block */}
        <div className="bg-slate-700 w-full h-12"></div>
      </nav>
    </>
  );
};

export default Header;
