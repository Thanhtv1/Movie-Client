import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/options";
import CompactBar from "../../component/CompactBar/CompactBar";
import Input from "../../component/Input/Input";
import LeftItem from "../../component/LeftItem/LeftItem";
import { localStorageService } from "../../services/LocalStorage";
import { axiosClient } from "../../services/_configURL";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Confirmation from "../../component/Modal/Confirmation";
import { useNavigate } from "react-router-dom";
import UploadImg from "../../component/Button/UploadImg";
import userService from "../../services/User";
import { resizeFile, dataURIToBlob } from "../../utils/options";
import axios from "axios";

export default function Setting() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    localStorageService.user.get() || {}
  );
  const [currentPass, setCurrentPass] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [information, setInformation] = useState({
    username: "",
    newEmail: "",
    newPass: "",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  };

  const handleChangeInput = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };
  const handleChangeConfirmPass = (e) => {
    setCurrentPass(e.target.value);
  };

  const handleImgChange = async (e) => {
    const [File] = e.target.files;
    if (!File.type.includes("image")) {
      toast.warning("You can only use image type", toastOptions(1500));
      return;
    }
    try {
      setOpenBackdrop(!openBackdrop);
      const image = await resizeFile(e.target.files[0]);
      const newFile = dataURIToBlob(image);
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("upload_preset", "l6an4tmo");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dfbmbn4by/image/upload",
        formData
      );
      const res = await axiosClient.put(`/user/updateAvatar`, {
        picture: data.url,
      });
      const user = await userService.getProfile();
      toast.success(res.data, toastOptions(1500));
      setCurrentUser(user);
      const updateStorage = {
        ...localStorageService.user.get(),
        avatar: user.avatar,
      };
      localStorageService.user.set(updateStorage);
    } catch (error) {
      toast.error(error.response?.data?.error?.message, toastOptions(2000));
    } finally {
      setOpenBackdrop(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleSubmitInformation = async (e) => {
    e.preventDefault();
    if (!information.username && !information.newPass && !information.newEmail)
      return;

    if (information.username && information.username.length < 5) {
      toast.error(
        "Username must contain more than 5 characters!",
        toastOptions(2500)
      );
      return;
    } else if (
      information.newEmail &&
      !information.newEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email!", toastOptions(2500));
      return;
    } else if (information.newPass && information.newPass.length < 5) {
      toast.error(
        "Password must contain more than 5 characters!",
        toastOptions(2500)
      );
      return;
    }
    try {
      const resUpdate = await axiosClient.put(`/user/updateProfile`, {
        username: information.username.toLowerCase(),
        newEmail: information.newEmail.toLowerCase(),
        newPass: information.newPass.toLowerCase(),
        currentPass: currentPass.toLowerCase(),
      });
      const data = await userService.getProfile();
      toast.success(resUpdate.data, toastOptions(1500));
      const updateUser = { ...localStorageService.user?.get(), ...data };
      localStorageService.user.set(updateUser);
      setCurrentUser(updateUser);
      setCurrentPass("");
      setInformation({
        username: "",
        newEmail: "",
        newPass: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data, toastOptions(1500));
    }
  };
  useEffect(() => {
    if (!localStorageService.user.get()) {
      navigate("/");
      return;
    } else {
      toast(
        `Click "SUBMIT" whenever you change any details`,
        toastOptions(2000)
      );
    }
  }, [navigate]);

  return (
    <div className="h-screen w-screen pt-5 md:pt-0 px-2 md:p-0 bg-[#EDF1F5]">
      <div className="overflow-x-hidden md:flex md:flex-row">
        <CompactBar>
          <LeftItem />
        </CompactBar>
        <div className="grid gap-y-5 w-full md:mt-4 h-full p-3 lg:p-5 xl:ml-56">
          <div className="flex items-center justify-center space-x-10">
            <div className="flex flex-col justify-center space-y-4 lg:flex-row lg:space-x-8 p-4 md:p-10 w-full max-w-3xl rounded-lg">
              <div className="overflow-hidden w-60 h-72 self-center block rounded-md shadow shadow-gray-800">
                <div className="text-center md:p-4 xl:p-0 pt-0 flex flex-col space-y-4 justify-center items-center">
                  <UploadImg
                    currentImg={currentUser?.avatar}
                    openBackdrop={openBackdrop}
                    handleImgChange={handleImgChange}
                  />
                  <ul
                    className="list-none sidebar-nav mb-0 px-3"
                    id="navmenu-nav"
                  >
                    <li className="flex justify-start items-start space-x-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/6135/6135265.png"
                        alt=""
                        className="img-small w-6 h-6"
                      />
                      <span className="text-gray-800 text-sm block">
                        {currentUser?.username}
                      </span>
                    </li>
                    <li className="flex justify-start items-start space-x-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
                        alt=""
                        className="img-small w-6 h-6"
                        width="256"
                        height="256"
                      />
                      <span className="text-gray-800 text-sm block text-clip">
                        {currentUser?.email}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <form className="flex flex-col space-y-5">
                <h2 className="text-2xl text-center text-[#516170] font-semibold">
                  Update Your Personal Details
                </h2>
                <Input
                  value={information.username}
                  name={`username`}
                  placeholder={`Enter your new username`}
                  handleChangeInput={handleChangeInput}
                />
                <Input
                  value={information.newEmail}
                  name={`newEmail`}
                  placeholder={`Enter your new email`}
                  handleChangeInput={handleChangeInput}
                />
                <Input
                  value={information.newPass}
                  name={`newPass`}
                  placeholder={`Enter your new password`}
                  handleChangeInput={handleChangeInput}
                />
                <div className="flex flex-row space-x-4">
                  <button
                    onClick={handleSubmitInformation}
                    className="bg-[#3577ff] px-3 rounded-md text-base font-semibold text-white outline-none hover:brightness-90"
                  >
                    Submit
                  </button>
                  <div className="max-w-[200px]">
                    <Input
                      value={currentPass}
                      type={`password`}
                      handleChangeInput={handleChangeConfirmPass}
                      name={`currentPass`}
                      placeholder={`Confirm password`}
                    />
                  </div>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 border border-red-500 px-3 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:brightness-90"
                  >
                    Delete Account
                  </button>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Confirmation
                      handleChangeConfirmPass={handleChangeConfirmPass}
                      setOpen={setOpen}
                      setCurrentPass={setCurrentPass}
                      currentPass={currentPass}
                    />
                  </Box>
                </Modal>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
