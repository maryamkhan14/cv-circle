import React, { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import LoadingSvg from "../assets/LoadingSvg";
const Outlet = lazy(() =>
  import("react-router-dom").then((module) => ({ default: module.Outlet }))
);

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
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default RegularLayout;
