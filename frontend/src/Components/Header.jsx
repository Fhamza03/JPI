import React from "react";
import EMSPI from "../images/EMSPI.png";

const Header = () => {
  return (
    <nav className="bg-sky-800 w-full h-17 flex items-center px-4 ">
      <img src={EMSPI} alt="Logo" className="w-20 h-auto mr-4" />
      <p className="text-white text-xl font-semibold tracking-wide">
        JESA - Engineering Modular System Project Information
      </p>
    </nav>
  );
};

export default Header;
