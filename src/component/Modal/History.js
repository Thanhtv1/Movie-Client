import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { localStorageService } from "../../services/LocalStorage";
import { toast } from "react-toastify";
import { MdHistory } from "react-icons/md";
import PopUp from "./PopUp";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../utils/options";
import ModalCard from "../Card/ModalCard";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function History({ css }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setIsloading(true);
    setOpen(false);
  };
  const [historyItems, setHistoryItems] = useState(
    localStorageService.user.getHistory() || []
  );
  const handleClickItem = (url) => {
    const checkUser = localStorageService.user.get();
    if (checkUser) {
      setOpen(true);
    } else {
      toast.warning("You must login to see this section", toastOptions(2000));
    }
    setTimeout(() => {
      setIsloading(false);
    }, 500);
  };
  const handleNavigate = (data) => {
    const { id } = data;
    setOpen(false);
    if ("seasons" in data) {
      navigate(`/tv/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }
  };
  const handleRemoveAll = () => {
    const getHistory = localStorageService.user?.getHistory();
    // console.log(getHistory);
    if (getHistory?.length === 0) {
      toast.warning("You have not watched any films yet", toastOptions(1500));
      return;
    }
    const emptyArr = [];
    setHistoryItems(emptyArr);
    localStorage.setItem("HISTORY", JSON.stringify(emptyArr));
    toast.success("Remove successfully", toastOptions(1200));
  };

  const handleDeleteItem = (id) => {
    const History = localStorageService.user.getHistory();
    if (History) {
      const newHistory = History.filter((h) => h.id !== id);
      setHistoryItems(newHistory);
      localStorage.setItem("HISTORY", JSON.stringify(newHistory));
      toast.success("Remove successfully", toastOptions(1200));
    }
  };
  return (
    <div>
      <button
        className={`${css ? css : "item-left-bar"}`}
        onClick={handleClickItem}
      >
        <MdHistory />
        <span className={`${css ? "block text-xs pb-2" : "ml-2"}`}>
          History
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
              <h2 className="text-lg font-semibold">History</h2>
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
            {!isLoading && historyItems?.length > 0 ? (
              historyItems.map((h) => (
                <ModalCard
                  key={h.id}
                  data={h}
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
