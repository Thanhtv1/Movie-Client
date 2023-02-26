import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import { localStorageService } from "../../services/LocalStorage";
import { axiosClient } from "../../services/_configURL";

import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toastOptions } from "../../utils/options";
import ModalCard from "../Card/ModalCard";
import userService from "../../services/User";
import PopUp from "./PopUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Favorite({ css }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favList, setFavList] = useState([]);
  const navigate = useNavigate();
  const handleNavigate = (data) => {
    setOpen(false);
    const { id } = data;
    if ("seasons" in data) {
      navigate(`/tv/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }
  };
  const handleDeleteItem = async (id) => {
    axiosClient
      .put("/user/removeAnItem", {
        data: id,
      })
      .then(async (res) => {
        const data = await userService.getProfile();
        setFavList(data.favMovies);
        toast.success(res.data, toastOptions(1200));
      })
      .catch((err) => {
        toast.warning(err?.response?.data || err?.message, toastOptions(1200));
      });
  };
  const handleRemoveAll = async () => {
    axiosClient
      .delete("/user/removeAllItem")
      .then(async (res) => {
        const data = await userService.getProfile();
        setFavList(data.favMovies);
        toast.success(res.data, toastOptions(1200));
      })
      .catch((err) => {
        toast.warning(err?.response?.data || err?.message, toastOptions(1200));
      });
  };
  const handleClose = () => {
    setIsLoading(true)
    setOpen(false)
  };

  const handleClickItem = async () => {
    const isUser = localStorageService.user.get()?.accessToken;
    if (isUser) {
      setOpen(true);
      const data = await userService.getProfile();
      setFavList(data.favMovies);
      setIsLoading(false);
    } else {
      toast.warning("You must login to see this section", toastOptions(2500));
    }
  };

  return (
    <div>
      <button
        onClick={() => handleClickItem("/favorites")}
        className={`${css ? css : "item-left-bar"}`}
      >
        <MdOutlineFavoriteBorder />
        <span className={`${css ? "block text-xs pb-2" : "ml-2"}`}>
          Favorites
        </span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="flex flex-col space-y-3 rounded" sx={style}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">My Favorites</h2>
              <button
                onClick={handleRemoveAll}
                className="px-3 py-1.5 text-slate-400 hover:text-white bg-slate-800 text-sm font-semibold rounded-lg transition-all duration-500 ease-in-out"
              >
                <i className="uil uil-users-alt mr-1" /> Remove All
              </button>
            </div>
            {isLoading && (
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            )}
            {!isLoading && favList?.length > 0 ? (
              favList.map((l) => (
                <ModalCard
                  key={l.id}
                  data={l}
                  handleDeleteItem={handleDeleteItem}
                  handleNavigate={handleNavigate}
                />
              ))
            ) : !isLoading ? (
              <PopUp handleClose={handleClose} />
            ) : undefined}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
