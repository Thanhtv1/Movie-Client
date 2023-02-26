import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { localStorageService } from "../../services/LocalStorage";
import { toast } from "react-toastify";
import History from "../Modal/History";
import Favorite from "../Modal/Favorite";
import { toastOptions } from "../../utils/options";
import userService from "../../services/User";

export default function LeftItem() {
  const navigate = useNavigate();
  const User = localStorageService.user.get()
  const handleClickItem = (url) => {
    if (User?.accessToken || User?.username) {
      navigate(url);
    } else {
      toast.warning("You must login to see this section", toastOptions(2000));
    }
  };
  const handleLogout = async () => {
    await userService.logOut();
    setTimeout(() => {
      navigate("/auth/login")
    }, 2000);
  };
  return (
    <>
      <Favorite />
      <History />
      <button
        onClick={() => handleClickItem("/settings")}
        className="item-left-bar"
      >
        <FiSettings />
        <span className="ml-2">Settings</span>
      </button>

      {User?.accessToken && User?.username ? (
        <button onClick={handleLogout} className="item-left-bar">
          <FiLogOut />
          <span className="ml-2">Logout</span>
        </button>
      ) : (
        <button
          onClick={() => navigate("/auth/login")}
          className="item-left-bar"
        >
          <FiLogIn />
          <span className="ml-2">Login</span>
        </button>
      )}
    </>
  );
}
