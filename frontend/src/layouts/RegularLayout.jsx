import React from "react";
import { Outlet } from "react-router-dom";

const RegularLayout = ({ user, setUser }) => {
  return (
    <div className="flex flex-1 justify-center items-stretch  w-full bg-gradient-to-r from-blue-200 to-purple-200">
      <Outlet context={[user, setUser]} />
    </div>
  );
};

export default RegularLayout;
