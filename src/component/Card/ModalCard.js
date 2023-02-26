import React from "react";
import { TMBD_IMG_URL } from "../../utils/constants";

export default function ModalCard({ data, handleNavigate, handleDeleteItem }) {
  return (
    <div
      key={data.id}
      className="flex cursor-pointer justify-between space-x-2"
    >
      <div
        onClick={() => handleNavigate(data)}
        className="flex justify-between grow items-center cursor-pointer pr-2 rounded-md shadow shadow-gray-400 bg-[#fafafa]"
      >
        <div className="flex items-center">
          <div className="relative inline-block h-24">
            <img
              src={`${TMBD_IMG_URL("w300")}${data.poster_path}`}
              className="h-full min-w-[60px] rounded-l-md border-2 border-gray-800"
              alt=""
            />
          </div>
          <div className="ml-2 h-full flex flex-col space-y-2">
            <p
              className="font-medium block text-sm hover:text-[#893218] text-clip"
            >
              {data.title || data.name}
            </p>
            <p className="text-slate-700 text-xs block">
              {data.first_air_date || data.release_date}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleDeleteItem(data.id)}
        className="hover:scale-110 transition duration-300 shrink-0"
      >
        <img
          className="w-6 h-6 z-50 object-cover"
          src="https://cdn-icons-png.flaticon.com/512/5226/5226891.png"
          alt=""
        ></img>
      </button>
    </div>
  );
}
