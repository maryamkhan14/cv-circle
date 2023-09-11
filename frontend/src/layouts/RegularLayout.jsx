import Toaster from "../components/Toaster";
import React, { Suspense, lazy } from "react";
import LoadingSvg from "../assets/LoadingSvg";
import { Outlet } from "react-router-dom";

const RegularLayout = ({ user, setUser }) => {
  return (
    <div className="flex flex-1 justify-center items-stretch w-full bg-gradient-to-r from-blue-200 to-purple-200">
      <Suspense
        fallback={
          <div className="flex flex-1 justify-center items-stretch w-full bg-gradient-to-r from-blue-200 to-purple-200">
            <div className="w-12 h-12 self-center">
              <LoadingSvg />
            </div>
          </div>
        }
      >
        <Outlet context={[user, setUser]} />
        <Toaster />
      </Suspense>
    </div>
  );
};

export default RegularLayout;
