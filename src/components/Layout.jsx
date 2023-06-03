import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <div className="flex min-w-0 min-h-screen h-fit flex-col w-screen items-center">
      <div className="flex w-full h-full">
        <Navbar />
      </div>
      <div className="flex flex-1 justify-center items-stretch bg-swirls w-full bg-cover">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
