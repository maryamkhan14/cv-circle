import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ user }) => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="bg-slate-50/80 flex p-7 flex-col md:flex-row justify-between items-center gap-5 shadow-md w-full ">
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
        <Link to="/" className="text-amber-800 font-medium">
          <h3>All posts</h3>
        </Link>
        {user ? (
          <>
            <Link to="/create-post" className="text-amber-800 font-medium">
              <h3>Create post</h3>
            </Link>

            <span className="relative group">
              <div className="flex gap-2 items-center justify-center md:justify-start md:pr-2 rounded-lg md:bg-blue-200/50 min-w-[10em] max-w-[15em]">
                <img
                  src={user.profilePic}
                  referrerPolicy="no-referrer"
                  className="rounded-lg w-[3em] h-[3em]"
                />
                <h3 className="md:flex hidden font-medium truncate text-ellipsis mr-1">
                  {user.displayName}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              {/* Dropdown menu */}
              <div className="md:hidden flex flex-col mt-1 md:mt-0 md:group-hover:block  md:absolute left-0 right-0 text-base z-50  pt-1">
                <div
                  id="dropdown"
                  className="flex flex-col  md:group-hover:block border-2 md:absolute left-0 right-0 bg-white text-base z-50 list-none divide-y divide-gray-100 rounded-lg shadow"
                >
                  <div className="px-4 py-3">
                    <h3>{user.name}</h3>
                    <h4 className="text-xs font-medium truncate">
                      {user.email}
                    </h4>
                  </div>
                  <ul className="py-1" aria-labelledby="dropdown">
                    <li>
                      <Link
                        to="/profile"
                        className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                      >
                        <h3 className="text-amber-800">Profile</h3>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
                      >
                        <h3 className="text-amber-800">Log out</h3>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </>
        ) : (
          <>
            <Link to="/login" className="text-amber-800 font-medium">
              <h3>Log in</h3>
            </Link>
            <Link to="/signup" className="text-amber-800 font-medium">
              <h3>Sign up</h3>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
