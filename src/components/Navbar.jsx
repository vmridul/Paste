import React from "react";
import { NavLink } from "react-router-dom";

const navbar = () => {
  return (
    <div className="flex justify-center gap-30 pt-3 mt-5">
      <NavLink
        to="/"
        className="text-blue-500 text-xl hover:text-blue-600 transition-all ease-in"
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className="text-blue-500 text-xl hover:text-blue-600 transition-all ease-in"
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default navbar;
