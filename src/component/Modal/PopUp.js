import React from "react";

export default function PopUp({ handleClose }) {
  return (
    <div className=" z-50 top-0 left-0 mx-auto w-64 h-54 overflow-hidden rounded-2xl bg-white py-6 text-left transition-all">
      <div className="max-h-96 overflow-y-auto">
        <p className="px-6 text-lg font-medium text-gray-600">
          The list is empty
        </p>
      </div>
      <div className="mt-4 px-6">
        <button
          onClick={handleClose}
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-500 transition duration-200 hover:bg-teal-200"
          tabIndex={0}
        >
          Done
        </button>
      </div>
    </div>
  );
}
