import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { addtoPaste, updatetoPaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";

const Viewpaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="flex justify-between mt-5 w-[500px]">
        <input
          className="bg-[#121212] text-white pl-4 p-2 w-85 focus:border-blue-900 border-1 border-[#121212] outline-0 rounded-sm"
          type="text"
          placeholder="Enter Title"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        <NavLink to="/">
        <button className="bg-[#121212] p-2 pl-10 pr-10 text-gray-400 rounded-sm hover:bg-blue-900 hover:text-white transition-all ease-in">
          Go Back
        </button>
          </NavLink>
      </div>

      <div className="flex justify-center mt-3">
        <textarea
          type="text"
          value={paste.value}
          rows={20}
          placeholder="Enter Content"
          onChange={(e) => setValue(e.target.value)}
          disabled
          className="bg-[#121212] text-white p-4
         focus:border-blue-900 border-1 border-[#121212] outline-0 rounded-lg min-w-[500px]
         "
        />
      </div>
    </div>
  );
};

export default Viewpaste;
