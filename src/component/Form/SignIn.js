import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { validateInput } from "./ValidateInput";
import { useNavigate } from "react-router-dom";
import { BsEyeSlash } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import userService from "../../services/User";

export default function SignIn() {
  // const dispatch = useDispatch();
  const initialValues = {
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
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormErrors(validateInput(formValues));
    setIsSubmit(true);
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      userService.logIn(formValues).then((res) => {
        if (!res?.user?._id || !res?.user?.email || !res?.user?.username) {
          return;
        }
        setTimeout(() => navigate("/"), 1800);
      });
    }
  }, [formErrors]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmitForm} className="form">
        <div className="px-6 py-10 rounded-2xl">
          <h3 className="font-semibold mb-4 text-2xl text-center text-black">Sign In</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black tracking-wide">
                Email
              </label>
              <input
                name={`email`}
                onChange={(e) => handleChangeInput(e)}
                className="w-full text-base px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border focus:border-blue-500"
                type={`text`}
                placeholder="mail@gmail.com"
              />
              <p className="text-red-600 text-xs">{formErrors?.email}</p>
            </div>
            <div className="space-y-2 relative">
              <label className="mb-5 text-sm font-medium text-black tracking-wide">
                Password
              </label>
              <input
                name={`password`}
                onChange={(e) => handleChangeInput(e)}
                className="w-full text-base px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border focus:border-blue-500"
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
              className="w-full flex justify-center bg-[#3577ff] hover:brightness-90 text-[#ffffff] p-3 rounded-full"
            >
              Sign In
            </button>
            {/* <OAuth /> */}
            <div className="text-sm flex justify-center mt-3 space-x-2">
              <span>Or:</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/auth/register");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
