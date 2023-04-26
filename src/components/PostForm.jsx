import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostForm = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col w-5/6 h-5/6 m-3 gap-5">
        <h1 className="text-5xl">Create a post</h1>
        <form className="rounded flex shadow-md flex-col gap-5 border p-3">
          <span className="flex flex-col md:flex-row gap-2 m-2 justify-center items-center">
            <label htmlFor="title">Title</label>
            <input
              className="border border-slate-800 w-full p-2 rounded"
              type="text"
              required="required"
            />
          </span>
          <span className="flex flex-col md:flex-row gap-2 m-2 justify-center items-center">
            <label htmlFor="post">Post</label>
            <textarea
              id="post"
              name="post"
              rows="4"
              cols="50"
              className="border border-slate-800 w-full p-2 rounded"
            ></textarea>
          </span>
          <span className="flex self-center">
            <button
              type="button"
              className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 mr-2 self-center flex items-center"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              Create post
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
