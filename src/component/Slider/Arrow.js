import React from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

export function NextArrow({ onClick }) {
  return (
    <div
      className="absolute z-10 p-2 rounded-full text-2xl text-slate-100 top-4 left-9 cursor-pointer hover:bg-opacity-50 transition duration-200"
      onClick={onClick}
    >
      <MdOutlineNavigateNext />
    </div>
  );
}

export function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute z-10 p-2 rounded-full text-2xl text-slate-100 top-4 left-4 cursor-pointer hover:bg-opacity-50 transition duration-200"
      onClick={onClick}
    >
      <MdOutlineNavigateBefore />
    </div>
  );
}
