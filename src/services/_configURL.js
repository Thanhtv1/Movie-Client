import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { localStorageService } from "./LocalStorage";
import jwt_decode from "jwt-decode";

const getCurrentToken = () => {
  const accessToken = localStorageService.user.get()?.accessToken;
  if (accessToken) {
    return `Bearer ${accessToken}`;
  } else {
    return null;
  }
};

export const axiosFilm = axios.create({
  baseURL: BASE_URL,
});

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SEVER,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: getCurrentToken(),
  },
});

axiosClient.interceptors.request.use(async (req) => {
  const newestToken = getCurrentToken();
  if (req.headers.Authorization !== newestToken && newestToken) {
    req.headers.Authorization = newestToken;
  }
  const user = jwt_decode(newestToken);
  const now = Date.now().valueOf() / 1000;

  // check if token is expired or not
  if (parseInt(now) < user.exp) {
    return req;
  }
  const { data } = await axios.post(
    `${process.env.REACT_APP_SEVER}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
  const updatedUser = {
    ...localStorageService.user.get(),
    accessToken: data.accessToken,
  };
  localStorageService.user.set(updatedUser);
  req.headers.Authorization = `Bearer ${data.accessToken}`;
  return req;
});
