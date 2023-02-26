import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateType } from "../../redux/Slices/Film";
import { localStorageService } from "../../services/LocalStorage";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/options";
import userService from "../../services/User";

export default function Header({ setIsLoading }) {
  const [isActive, setIsActive] = useState(
    localStorage.getItem("type") || "movie"
  );
  const dispatch = useDispatch();
  const user = localStorageService.user.get();
  const navigate = useNavigate();

  const handleChangeType = (clickedType) => {
    if (localStorage.getItem("type") === clickedType) {
      return;
    }
    if (typeof setIsLoading === "function") {
      setIsLoading();
    }
    dispatch(updateType(clickedType));
    setIsActive(clickedType);
    localStorage.setItem("type", clickedType);
  };

  const handleLogin = async () => {
    navigate("/auth/login");
  };

  const handleLogout = async () => {
    await userService.logOut().then(() =>
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000)
    );
  };

  const handleClick = () => {
    if (user?.accessToken && user?.username && Object.keys(user)?.length > 0) {
      navigate("/settings");
      return;
    }
    toast.warning("You must login to see this page", toastOptions(1500));
  };

  return (
    <header className="flex items-center justify-between h-16 max-w-screen-xl px-2.5 lg:px-4 text-sm font-bold">
      <div className="flex space-x-5">
        <button
          style={{
            borderBottom: isActive === "movie" ? "2px solid black" : "",
            color: "black",
          }}
          onClick={() => handleChangeType("movie")}
          className="outline-none text-sm text-[#647380] duration-300 hover:text-black "
          title="movie"
        >
          Movie
        </button>
        <button
          style={{
            borderBottom: isActive === "tv" ? "2px solid black" : "",
            color: "black",
          }}
          onClick={() => handleChangeType("tv")}
          className="outline-none text-[#647380] text-sm transition duration-300 hover:text-black"
          title="tv"
        >
          TV Show
        </button>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <div className="flex justify-center items-center space-x-1">
          <Avatar
            className="cursor-pointer"
            onClick={handleClick}
            alt="User Avatar"
            src={`${
              user?.avatar
                ? user.avatar
                : `https://cdn-icons-png.flaticon.com/512/848/848043.png`
            }`}
          />
          <span className="text-sm font-medium ">
            {user?.username ? user.username.length > 12 ? user.username.slice(0,8) + "..." :  user.username : "Anonymous"}
          </span>
        </div>
        {Object.keys(user)?.length > 0 ? (
          <button
            onClick={handleLogout}
            className="p-2 block md:hidden bg-[#3577ff] rounded-md text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="p-2 block md:hidden bg-[#3577ff] rounded-md text-white"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
