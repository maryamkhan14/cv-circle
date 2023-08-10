import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { postLogout } from "../services/auth-services";

const LoggedOut = () => {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const logOutUser = async () => {
    if (user) {
      let { success } = await postLogout();
      dispatch({ type: "USER_SIGNED_OUT", payload: null });
      sessionStorage.clear();
    }
    navigate("/");
  };

  useEffect(() => {
    logOutUser();
  }, []);

  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-2 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      {" "}
      <h1 className="text-5xl">You're logged out!</h1>
      <h3 className="text-3xl">Sending you back...</h3>
    </div>
  );
};

export default LoggedOut;
