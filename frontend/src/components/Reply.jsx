import React from "react";
import ReplyForm from "./ReplyForm";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ReplyOptions from "./ReplyOptions";

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
      className={`flex flex-col w-full justify-between items-start pl-3 pt-3  border-t-2 border-slate-300 ${
        level > 0 ? calculateIndent(level) : ""
      }`}
    >
      <div className="flex w-full mb-2 flex-col gap-10 md:gap-0 md:flex-row">
        <div
          className={` ${
            replyFormActive && mode === "edit" && "hidden"
          } w-full`}
        >
          <p className="flex-1 break-words whitespace-pre-wrap pr-5" lang="en">
            {reply.postContent}
          </p>
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
        <span
          className={`${
            replyFormActive && "hidden"
          } flex self-center justify-center gap-5
           md:gap-0 w-full md:w-auto md:self-end`}
        >
          <ReplyOptions
            setMode={setMode}
            setReplyFormActive={setReplyFormActive}
            user={user}
            reply={reply}
          />
        </span>
      </div>
      {replies.length > 0 &&
        replies.map((reply) => <Reply reply={reply} key={reply.id} />)}
    </div>
  );
};

export default Reply;
