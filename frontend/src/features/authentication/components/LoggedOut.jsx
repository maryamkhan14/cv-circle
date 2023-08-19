import React from "react";
import { useEffect } from "react";
import { useMutation, QueryClient } from "@tanstack/react-query";
import ReportButton from "../../../components/ReportButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import { postLogout } from "../services";

const LoggedOut = () => {
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { isLoading, isError, error, mutateAsync } = useMutation({
    mutationFn: postLogout,
    cacheTime: 0,
  });
  useEffect(() => {
    if (user) {
      mutateAsync(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries("user");
            queryClient.removeQueries("user");
            setUser(null);
            navigate("/");
          },
        }
      );
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-5 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      {isLoading ? (
        <>
          {" "}
          <h1 className="text-5xl">Goodbye for now!</h1>
          <h3 className="text-3xl">We're logging you out...</h3>
        </>
      ) : isError ? (
        <>
          <span className="flex flex-col justify-center border-b-2 border-slate-50 gap-5 h-1/2">
            <h1 className="text-5xl">Logout failed :(</h1>
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
          <h1 className="text-5xl">You're logged out!</h1>
          <h3 className="text-3xl">Sending you back...</h3>
        </>
      )}
    </div>
  );
};

export default LoggedOut;
