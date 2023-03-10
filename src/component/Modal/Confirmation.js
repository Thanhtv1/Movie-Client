import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { localStorageService } from "../../services/LocalStorage";
import Input from "../Input/Input";
import { toastOptions } from "../../utils/options";
import userService from "../../services/User";

export default function Confirmation({
  currentPass,
  setCurrentPass,
  setOpen,
  handleChangeConfirmPass,
}) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (!currentPass) {
        toast.error("Please enter your confirm password", toastOptions(1500));
        return;
      } else {
        const data = await userService.deleteAccount(currentPass);
        setCurrentPass("");
        toast.success(data, toastOptions(1200));
        setOpen(false);
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
        localStorageService.user.remove();
      }
    } catch (error) {
      toast.error(error?.response?.data, toastOptions(1500));
    }
  };
  return (
    <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
      <div>
        <div className="text-center p-5 flex-auto justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 flex items-center text-red-500 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
          <p className="text-sm text-gray-500 px-8">
            Do you really want to delete your account? This process cannot be
            undone
          </p>
        </div>
        <Input
          value={currentPass}
          type={`password`}
          handleChangeInput={handleChangeConfirmPass}
          name={`currentPass`}
          placeholder={`Confirm password`}
        />
        <div className="p-3 mt-2 text-center space-x-4 md:block">
          <button
            onClick={() => setOpen(false)}
            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
