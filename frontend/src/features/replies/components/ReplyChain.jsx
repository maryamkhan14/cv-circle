import React from "react";
import { ReplyFormContextProvider } from "../context/ReplyFormContext";
import Reply from "./Reply";

const ReplyChain = ({ reply, user }) => {
  const calculateIndent = () => {
    let level = reply?.level || 0;
    switch (level - 1) {
      case 1:
        return "pl-lvl-1";
      case 2:
        return "pl-lvl-2";
      case 3:
        return "pl-lvl-3";
      case 4:
        return "pl-lvl-4";
      default:
        return "pl-lvl-4";
    }
  };
  return (
    <>
      <div
        className={`flex flex-col w-full justify-between items-start pl-5 pt-3 ${
          !user && "mb-4"
        } border-t-2 border-slate-300 min-h-3/4 ${calculateIndent()}`}
      >
        <ReplyFormContextProvider>
          <Reply reply={reply} user={user} />
        </ReplyFormContextProvider>
      </div>
      {reply?.replies &&
        Object.keys(reply?.replies).map((chainId) => {
          return (
            <ReplyFormContextProvider key={chainId}>
              <ReplyChain
                reply={reply?.replies[chainId]}
                key={chainId}
                user={user}
              />
            </ReplyFormContextProvider>
          );
        })}
    </>
  );
};

export default ReplyChain;
