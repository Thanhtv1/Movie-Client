import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/options";
import { localStorageService } from "./LocalStorage";
import { axiosClient } from "./_configURL";

const userService = {
  getProfile: async function () {
    try {
      const { data } = await axiosClient.get("/user/profile");
      return data;
    } catch (error) {
      toast.error(error?.response?.data || error?.message, toastOptions(1500));
    }
  },
  deleteAccount: async function (currentPass) {
    try {
      const { data } = await axiosClient.post(
        "/user/deleteAccount",
        {
          confirmPass: currentPass,
        },
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      toast.error(error?.response?.data || error?.message, toastOptions(1500));
    }
  },
  logIn: async function (formValues) {
    const userCredentials = {
      email: formValues.email.toLowerCase(),
      password: formValues.password.toLowerCase(),
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SEVER}/auth/login`,
        userCredentials,
        {
          withCredentials: true,
        }
      );
      localStorageService.user.set(data.user);
      toast.success("Login successfully", toastOptions(1500));
      return data;
    } catch (error) {
      toast.error(error?.response?.data || error?.message, toastOptions(1500));
    }
  },
  logOut: async function () {
    try {
      await axiosClient.post("/auth/logout", undefined, {
        withCredentials: true,
      });
      toast.success("Logout Successfully", toastOptions(1500));
      localStorageService.user.remove();
    } catch (error) {
      toast.error(error?.response?.data || error?.message, toastOptions(1500));
    }
  },
};

export default userService;
