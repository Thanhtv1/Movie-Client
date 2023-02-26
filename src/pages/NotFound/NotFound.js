import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-[#EDF1F5] flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-7xl  font-bold mb-2">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn't find this page.
          </p>
          <p className="my-6 text-lg">
            But dont worry, you can explore various enjoyable things on our
            homepage.
          </p>
          <button className="px-4 inline py-2 text-base font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
            <a href="/">Go back</a>
          </button>
        </div>
      </div>
    </div>
  );
}
