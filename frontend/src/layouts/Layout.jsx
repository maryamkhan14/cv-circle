import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ user, setUser }) => {
  return (
    <div className="flex min-w-0 min-h-screen h-fit flex-col w-screen items-center">
      <div className="flex w-full h-full">
        <Navbar user={user} />
      </div>
      <Outlet context={[user, setUser]} />
    </div>
  );
};

export default Layout;
