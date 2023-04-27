import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <div className="flex min-w-0 h-full flex-col w-screen items-center">
      <Navbar />
      <div className="flex justify-center items-center bg-swirls w-full h-full bg-cover">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
