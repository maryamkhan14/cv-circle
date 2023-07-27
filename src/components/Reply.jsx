import React from "react";
import ReplyForm from "./ReplyForm";
import { useState, useEffect, useContext } from "react";

const Reply = ({ reply, level }) => {
  const [replyFormActive, setReplyFormActive] = useState(false);
  const [mode, setMode] = useState("create");
  const calculateIndent = (level) => {
    return `ml-[${level * 100}px]`;
  };
  const original = {
    createdAt: "",
    id: "12",
    imgCdn: "",
    postContent: "Test reply",
    title: "",
    file: null,
    parentId: "1",
  };
  return (
    <div
      className={`flex justify-between items-start p-3 border-l-4 border-slate-300 ${
        level && calculateIndent(level)
      }`}
    >
      <div
        className={`mr-[2px] ${
          replyFormActive && mode === "edit" && "hidden"
        } w-full`}
      >
        {original.postContent}
        {replyFormActive && mode === "create" && (
          <ReplyForm
            setReplyFormActive={setReplyFormActive}
            original={original}
            mode={mode}
          />
        )}
      </div>
      {replyFormActive && mode === "edit" && (
        <ReplyForm
          setReplyFormActive={setReplyFormActive}
          original={original}
          mode={mode}
        />
      )}
      <span className={`flex ${replyFormActive && "hidden"}`}>
        <button
          type="submit"
          aria-label="Reply"
          className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
          onClick={() => {
            setReplyFormActive(true);
            setMode("create");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 self-center flex items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <button
          type="submit"
          className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
          onClick={() => {
            setReplyFormActive(true);
            setMode("edit");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 self-center flex items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </span>
    </div>
  );
};

export default Reply;
