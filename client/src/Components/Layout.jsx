import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import { useSelector } from "react-redux";

const Layout = () => {
  const { postLoginData } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLoginPage = () => {
    navigate("/auth/Login");
  };
  const handleSingUpPage = () => {
    navigate("/auth/signup");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (
        pathname.includes("auth/") ||
        pathname.toLowerCase().includes("home")
      ) {
        navigate("/add-list");
      }
    } else {
      if (!pathname.includes("auth/")) navigate("auth/login");
    }
  }, [postLoginData, pathname]);

  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
