import React, { lazy, Suspense } from "react";
import { ReplyFormContextProvider } from "../context/ReplyFormContext";
import Reply from "./Reply";
import LoadingSvg from "../../../assets/LoadingSvg";
const ReplyAuthor = lazy(() => import("./ReplyAuthor"));
const ReplyChain = ({ reply, user, originalAuthorId }) => {
  const calculateIndent = () => {
    let level = reply?.level || 0;
    switch (level - 1) {
      case 1:
        return "ml-lvl-1";
      case 2:
        return "ml-lvl-2";
      case 3:
        return "ml-lvl-3";
      case 4:
        return "ml-lvl-4";
      default:
        return "ml-lvl-4";
    }
  };
  return (
    <>
      {/**Display the top-level reply of this chain */}
      <div
        className={`flex justify-between items-start pl-5 py-3 ${
          !user && "mb-4"
        } border-t-2 border-slate-300 min-h-3/4 ${calculateIndent()} divide-x-2 divide-dashed divide-slate-300 divide`}
      >
        <Suspense
          fallback={
            <div className="w-8 h-8">
              <LoadingSvg />
            </div>
          }
        >
          <ReplyAuthor
            authorId={reply?.userId}
            currentUser={user}
            isOriginalAuthor={reply?.userId === originalAuthorId}
          />
        </Suspense>

        <ReplyFormContextProvider>
          <Reply reply={reply} user={user} />
        </ReplyFormContextProvider>
      </div>
      {/**Display all other replies that are nested under this top-level reply. */}
      {reply?.replies &&
        Object.keys(reply?.replies).map((chainId) => {
          return (
            <ReplyFormContextProvider key={chainId}>
              <ReplyChain
                reply={reply?.replies[chainId]}
                key={chainId}
                user={user}
                originalAuthorId={originalAuthorId}
              />
            </ReplyFormContextProvider>
          );
        })}
    </>
  );
};

export default ReplyChain;
