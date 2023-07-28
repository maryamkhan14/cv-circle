import React from "react";
import ReplyForm from "./ReplyForm";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Reply = ({ reply: reply }) => {
  const { user } = useContext(UserContext);
  const [replyFormActive, setReplyFormActive] = useState(false);
  const [mode, setMode] = useState("create");
  const { replies, level } = reply;
  const calculateIndent = (level) => {
    switch (level) {
      case 1:
        return "pl-lvl-1";
      case 2:
        return "pl-lvl-2";
      case 3:
        return "pl-lvl-3";
      case 4:
        return "pl-lvl-4";
      default:
        return "pl-lvl-1";
    }
  };
  return (
    <div
      className={`flex flex-col w-full justify-between items-start pl-3 pt-3 pb-1  border-t-2 border-slate-300 ${
        level > 0 ? calculateIndent(level) : ""
      }`}
    >
      <div className="flex w-full">
        <div
          className={` ${
            replyFormActive && mode === "edit" && "hidden"
          } w-full`}
        >
          {reply.postContent}
          {replyFormActive && mode === "create" && (
            <ReplyForm
              setReplyFormActive={setReplyFormActive}
              original={reply}
              mode={mode}
            />
          )}
        </div>
        {replyFormActive && mode === "edit" && (
          <ReplyForm
            setReplyFormActive={setReplyFormActive}
            original={reply}
            mode={mode}
          />
        )}
        <span className={`flex ${replyFormActive && "hidden"}`}>
          <button
            type="submit"
            aria-label="Create reply"
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
          {user && user.userId === reply.userId && (
            <button
              type="submit"
              aria-label="Edit reply"
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
          )}
        </span>
      </div>
      {replies.length > 0 &&
        replies.map((reply) => <Reply reply={reply} key={reply.id} />)}
    </div>
  );
};

export default Reply;
