import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
import { addtoPaste, updatetoPaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.value);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      value: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatetoPaste(paste));
    } else {
      dispatch(addtoPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="flex justify-between mt-5 w-[500px]">
        <input
          className="bg-[#121212] text-white pl-4 p-2 w-85 focus:border-blue-900 border-1 border-[#121212] outline-0 rounded-sm"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="bg-[#121212] p-2 pl-5 pr-5 text-gray-400 rounded-sm hover:bg-blue-900 hover:text-white transition-all ease-in"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="flex justify-center mt-3">
        <textarea
          type="text"
          value={value}
          rows={20}
          placeholder="Enter Content"
          onChange={(e) => setValue(e.target.value)}
          className="bg-[#121212] text-white p-4
         focus:border-blue-900 border-1 border-[#121212] outline-0 rounded-lg min-w-[500px]
         "
        />
      </div>
    </div>
  );
};

export default home;
