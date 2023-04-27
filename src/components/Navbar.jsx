import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [hidden, setHidden] = useState(true);
  const { user, dispatch } = useContext(UserContext);
  const updateUser = () => {
    if (Object.keys(user).length == 0 && sessionStorage && sessionStorage.uid) {
      dispatch({
        type: "USER_SIGNED_IN",
        payload: {
          user: {
            name: sessionStorage.uname,
            id: sessionStorage.uid,
            profilePic: sessionStorage.profilePic,
            email: sessionStorage.email,
          },
        },
      });
    }
  };
  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="bg-slate-50 flex p-7 flex-col md:flex-row justify-between items-center gap-5 shadow-md w-full ">
      <Link to="/">
        <span className="flex items-center gap-3">
          <h1 className="text-blue-800 text-3xl font-[400] uppercase hover:cursor-pointer">
            CV Circle
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6 stroke-amber-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </span>
      </Link>

      <div className="md:hidden" onClick={() => setHidden(!hidden)}>
        {hidden ? (
          <div className="rounded-full p-3 hover:bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        ) : (
          <div className="rounded-full p-3 hover:bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        )}
      </div>

      <div
        className={`${
          hidden ? "hidden" : "flex"
        } md:flex flex-col md:flex-row items-center gap-5 md: gap-10`}
      >
        {Object.keys(user).length > 0 ? (
          <>
            <Link to="/all-posts" className="text-amber-800 font-semibold">
              All posts
            </Link>
            <Link to="/create-post" className="text-amber-800 font-semibold">
              Create post
            </Link>
            <Link to="/logged-out" className="text-amber-800 font-semibold">
              Log out
            </Link>
            <span>
              <img
                src={user.profilePic}
                width={40}
                referrerPolicy="no-referrer"
                className="rounded-full border-2 border-blue-800"
              />
            </span>
          </>
        ) : (
          <>
            <Link to="/all-posts" className="text-amber-800 font-semibold">
              All posts
            </Link>
            <Link to="/login" className="text-amber-800 font-semibold">
              Log in
            </Link>
            <Link to="/signup" className="text-amber-800 font-semibold">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
