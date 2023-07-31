import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotPermitted = () => {
  const navigate = useNavigate();
  let time = 5;
  const [countdown, setCountdown] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(--time);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (countdown === 0) {
      navigate(-1);
    }
  }, [countdown]);
  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-2 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      <h1 className="text-5xl">Not Authorized</h1>
      <h3 className="text-3xl">
        Sorry, you are not permitted to access this page. Sending you back in{" "}
        {countdown} seconds.
      </h3>
    </div>
  );
};

export default NotPermitted;
