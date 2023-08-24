import React from "react";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ReportButton from "../../../components/ReportButton";

const LoggedIn = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data: user, error } = useUser();
  const [, setUser] = useOutletContext();
  useEffect(() => {
    if (user) {
      setUser(user);

      navigate("/");
    }
  }, [user]);
  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-5 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      {isLoading ? (
        <>
          <h1 className="text-5xl">Verifying your details...</h1>
          <p className="text-2xl">You'll be in in just a bit!</p>
        </>
      ) : isError ? (
        <>
          <span className="flex flex-col justify-center border-b-2 border-slate-50 gap-5 h-1/2">
            <h1 className="text-5xl">Login failed :(</h1>
            <p className="text-2xl">
              Something went wrong. Our team will be looking into this.
            </p>
          </span>
          <span className="flex flex-col gap-5 py-3 h-1/2 justify-center">
            <h2 className="text-3xl">The details:</h2>
            <span className="flex justify-center self-center gap-3">
              Error code:{" "}
              <p className="text-amber-800">
                {error.status || "[no error code found]"}
              </p>
            </span>
            <span className="flex justify-center self-center gap-3 flex-col md:flex-row">
              Error message:{" "}
              <p className="text-amber-800">
                {error.message || "[no error message found]"}
              </p>
            </span>
            <ReportButton />
          </span>
        </>
      ) : (
        <>
          <h1 className="text-5xl">You're in!</h1>
          <p className="text-2xl">Sending you back...</p>
        </>
      )}
    </div>
  );
};

export default LoggedIn;
