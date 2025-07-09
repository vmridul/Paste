import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupId, setShowPopupId] = useState(null);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removefromPastes(pasteId));
  }

  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#121212] outline-none rounded-sm text-white p-3 pl-5 pr-5 min-w-[700px]"
        />
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        {showPopup && (
          <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#121212] p-6 rounded shadow-lg w-80">
              <h2 className="text-lg font-semibold mb-4">Share</h2>
              <p className="mb-4">www.pastes.com/pastes/{showPopupId}</p>
              <button
                className="hover:bg-blue-900 transition-all ease-in bg-blue-800 text-white px-4 py-2 rounded"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `www.pastes.com/pastes/s${showPopupId}`
                  );
                  toast.success("Link Copied");
                  setShowPopup(false);
                }}
              >
                Copy
              </button>
            </div>
          </div>
        )}
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="relative border-1 border-gray-500 rounded-lg w-[700px] p-4 hover:bg-[#2b2b2b]"
                onClick={() => navigate(`/pastes/${paste._id}`)}
              >
                <div className="font-medium text-3xl overflow-hidden break-words">{paste.title}</div>
                <div className="mt-2 overflow-hidden break-words">{paste.value}</div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-4 absolute right-5 top-5"
                >
                  <button className="hover:bg-blue-900 transition-all ease-in p-2 pl-3 pr-3 bg-[#121212] rounded-md text-sm">
                    <NavLink to={`/?pasteId=${paste._id}`}>Edit</NavLink>
                  </button>
                  <button className="hover:bg-blue-900 transition-all ease-in p-2 pl-3 pr-3 bg-[#121212] rounded-md text-sm">
                    <NavLink to={`/pastes/${paste._id}`}>View</NavLink>
                  </button>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="hover:bg-red-900 transition-all ease-in p-2 pl-3 pr-3 bg-[#121212] rounded-md text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.value);
                      toast.success("Copied to clipboard");
                    }}
                    className="hover:bg-green-900 transition-all ease-in p-2 pl-3 pr-3 bg-[#121212] rounded-md text-sm"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => {
                      setShowPopupId(paste._id);
                      setShowPopup(true);
                    }}
                    className="hover:bg-blue-900 transition-all ease-in p-2 pl-3 pr-3 bg-[#121212] rounded-md text-sm"
                  >
                    Share
                  </button>
                </div>
                <div className="absolute top-18 right-5 text-xs font-light">
                  {paste.createdAt.substring(0, 10)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
