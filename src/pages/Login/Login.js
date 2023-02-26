import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../../services/LocalStorage";

export default function Login({ children }) {
  const background = "../../../pexels-nicolas-poupart-2360569.jpg";
  const navigate = useNavigate();
  const user = localStorageService.user.get()?.accessToken;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user,navigate]);
  
  return (
    <main className="h-full bg-center relative overflow-y-hidden">
      <img
        src={background}
        className="absolute top-0 object-fill w-screen h-screen left-0"
        alt=""
      ></img>
      {children}
    </main>
  );
}
