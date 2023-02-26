import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../../redux/Slices/Film";
import { BiSearch } from "react-icons/bi";
import useQueryString from "../../hooks/useQueryString";
import SmallVersion from "./SmallVersion";

function CompactBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentParams = useQueryString();

  const handleClickDiscover = () => {
    if (Object.keys(currentParams)?.length > 0) {
      dispatch(removeAllItems());
    }
    navigate("/discover");
  };

  return (
    <>
      <div className="hidden h-max z-10 pb-2 shrink-0 xl:h-screen bg-white border border-r-gray-200 xl:fixed md:block md:w-48 lg:w-56">
        <div className="h-full flex flex-col space-y-5 rounded-2xl">
          <div className="w-full flex h-20 justify-center items-center gap-3 pt-2 shadow shadow-gray-300">
            <img
              className="mb-2"
              src="https://cdn-icons-png.flaticon.com/512/3845/3845894.png"
              width={50}
              height={50}
              alt=""
            />
            <span className="text-effect text-animation">T-MOVIE</span>
          </div>
          <div className={`flex flex-col space-y-5 px-2`}>
            <button onClick={() => navigate("/")} className="item-left-bar ">
              <FiHome />
              <span className="ml-2">Home</span>
            </button>
            <button onClick={handleClickDiscover} className="item-left-bar">
              <MdOutlineExplore />
              <span className="ml-2">Discover</span>
              <span className="h-3 w-3 self-start">
                <span
                  className="inline-flex h-3 w-3 animate-ping rounded-full bg-gray-800 opac
            ity-75"
                />
              </span>
            </button>
            <button
              onClick={() => navigate("/search")}
              className="item-left-bar"
            >
              <BiSearch />
              <span className="ml-2">Search</span>
            </button>
            {children}
          </div>
          <p className="text-sm font-medium mt-4 text-center text-gray-500 pb-4">
            T-Chill © 2022
          </p>
        </div>
      </div>
      <SmallVersion />
    </>
  );
}

export default memo(CompactBar);
