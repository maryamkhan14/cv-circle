import React from "react";

const Login = () => {
  return (
    <div className="rounded flex flex-col md:flex-row shadow-md border m-5 w-4/5">
      <img src="src/assets/Waiau.png" className="w-full md:w-3/5" />
      <div className="w-full flex justify-center px-3 py-5 font-[700] h-full">
        <h2 className="text-3xl text-slate-900">Welcome Back!</h2>
      </div>
    </div>
  );
};

export default Login;
