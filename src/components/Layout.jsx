import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <div className="flex min-w-0 flex-col w-screen items-center">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
