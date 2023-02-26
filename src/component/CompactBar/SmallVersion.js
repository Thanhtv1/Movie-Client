import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/LocalStorage";
import { toast } from "react-toastify";
import Favorite from "../Modal/Favorite";
import History from "../Modal/History";
import { toastOptions } from "../../utils/options";

export default function SmallVersion() {
  const [user] = useState(localStorageService.user.get() || {});
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNavigate = () => {
    if (user?.accessToken) {
      navigate("/settings");
    } else {
      toast.warning("You must login to see this section", toastOptions(1500));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`md:hidden transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "translate-y-24"
      } flex flex-col justify-center h-20 fixed bottom-0 left-0 inset-x-0 z-50 shadow-lg text-gray-800 bg-slate-100 border-t-2`}
    >
      <ul className="flex flex-row justify-center space-x-6">
        <li>
          <Link
            to="/"
            className="flex flex-col items-center space-y-1 justify-center text-center mx-auto w-full text-gray-800"
          >
            <FiHome />
            <span className="block text-xs pb-2">Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/discover"
            className="flex flex-col items-center space-y-1 justify-center text-center mx-auto w-full text-gray-800"
          >
            <MdOutlineExplore />
            <span className="block text-xs pb-2">Discover</span>
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="flex flex-col items-center space-y-1 justify-center text-center mx-auto w-full text-gray-800"
          >
            <BiSearch />
            <span className="block text-xs pb-2">Search</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleNavigate}
            className="flex flex-col items-center space-y-1 justify-center text-center mx-auto w-full text-gray-800"
          >
            <FiSettings />
            <span className="block text-xs pb-2">Settings</span>
          </button>
        </li>
        <li>
          <Favorite css="flex flex-col items-center space-y-1 justify-center text-center mx-auto w-full text-gray-800" />
        </li>
        <li>
          <History css="flex flex-col items-center space-y-1 justify-center text-center mx-auto w-full text-gray-800" />
        </li>
      </ul>
    </div>
  );
}
