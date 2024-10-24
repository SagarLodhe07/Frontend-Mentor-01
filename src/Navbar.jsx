import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const Navbar = ({ darkmode, toggleMode }) => {
  return (
    <nav
      className={`w-full
  flex justify-between items-center p-10 h-10 shadow-lg ${
    darkmode ? "bg-[#2b3945] text-white" : "bg-[#fafafa] "
  }`}
    >
      {" "}
      <h1 className=" md:text-2xl text-lg font-nunito-sans font-semibold">
        Where in the world ?
      </h1>{" "}
      <div className={`flex items-center gap-3`}>
        <span onClick={toggleMode} className="cursor-pointer">
          {darkmode ? <BiSun size={18} /> : <BiMoon size={18} />}
        </span>
        <span className="font-normal">
          {darkmode ? "Light Mode" : "Dark Mode"}{" "}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
