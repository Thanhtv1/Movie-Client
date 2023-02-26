import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/options";
import { validateInput } from "./ValidateInput";

export default function SignUp() {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormErrors(validateInput(formValues));
    setIsSubmit(true);
  };
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post(`${process.env.REACT_APP_SEVER}/auth/register`, {
          username: formValues.userName,
          email: formValues.email,
          password: formValues.password,
        })
        .then((res) => {
          toast.success("Register successfully!", toastOptions(1000));
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
          return res;
        })
        .catch((err) => {
          toast.error(err?.response?.data, toastOptions(1500));
        });
    }
  }, [formErrors]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmitForm} className="form">
        <div className="py-10 px-6 rounded-2xl">
          <h3 className="font-semibold mb-4 text-2xl text-center text-black">
            Sign Up
          </h3>
          <div className="space-y-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black tracking-wide">
                Username
              </label>
              <input
                name={`userName`}
                onChange={(e) => handleChangeInput(e)}
                className=" w-full text-base px-4 py-2 border border-gray-300 rounded"
                type={`text`}
                placeholder="Enter your User Name"
              />
              <p className="text-red-600 text-xs">{formErrors?.userName}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black tracking-wide">
                Email
              </label>
              <input
                name={`email`}
                onChange={(e) => handleChangeInput(e)}
                className=" w-full text-base px-4 py-2 border border-gray-300 rounded"
                type={`text`}
                placeholder="mail@gmail.com"
              />
              <p className="text-red-600 text-xs">{formErrors?.email}</p>
            </div>
            <div className="space-y-2 relative">
              <label className="mb-5 text-sm font-medium text-black ">
                Password
              </label>
              <input
                name={`password`}
                onChange={(e) => handleChangeInput(e)}
                className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter your password"
              />
              <i
                className="absolute cursor-pointer top-0 right-0"
                onClick={togglePasswordVisiblity}
              >
                {passwordShown ? <BsEyeSlash /> : <FiEye />}
              </i>
              <p className="text-red-600 text-xs">{formErrors?.password}</p>
            </div>
            <div className="flex items-center justify-between"></div>
            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full"
            >
              Submit
            </button>
            <div className="text-sm flex justify-center mt-3 space-x-2 ">
              <span>Or:</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/auth/login");
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
