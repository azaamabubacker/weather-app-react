// NavBar.js
import React from "react";
import Logo from "assets/Logo.svg";

const NavBar = ({ onLogout }) => {
  return (
    <div className="flex h-10v items-center justify-between ">
      <img alt="Logo" src={Logo} />
      <button
        onClick={onLogout}
        className="flex items-center justify-center rounded-lg border border-secondary px-4  py-2 text-secondary  "
      >
        LOGOUT
      </button>
    </div>
  );
};

export default NavBar;
