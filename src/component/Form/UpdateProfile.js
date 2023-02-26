import React from "react";

export default function UpdateProfile({ user }) {
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("update");
  };
  return (
    <div className="flex justify-center items-center lg:justify-start lg:mt-5">
      <div className="bg-white lg:max-w-sm rounded-lg p-8">
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={user?.username}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={user?.email}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="subject"
              placeholder="Enter your new password"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-full bg-[#6A64F1] px-5 py-2 text-base font-semibold text-white outline-none"
            >
              Update
            </button>
          </div>
        </form>
        <div className="mt-5 lg:hidden">
          <button className="bg-red-500 border  border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
