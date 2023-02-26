import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function UploadImg({
  currentImg,
  handleImgChange,
  openBackdrop,
}) {
  return (
    <>
      <img
        src={`${
          currentImg
            ? currentImg
            : "https://cdn-icons-png.flaticon.com/512/94/94386.png"
        }`}
        className="mt-1.5 w-28 h-28 m-auto rounded-full shadow mx-auto"
        alt=""
      />
      <label className="w-40 flex flex-col items-center px-4 border-gray-500 text-blue rounded-lg tracking-wide uppercase border cursor-pointer hover:bg-blue-400 hover:text-slate-100">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-1 text-sm leading-normal">Select a file</span>
        <input
          disabled={openBackdrop}
          onChange={handleImgChange}
          accept="/image/*"
          type="file"
          className="hidden"
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </label>
    </>
  );
}
