import { Suspense, lazy } from "react";
import LoadingSvg from "../../../assets/LoadingSvg";
const ReplyChain = lazy(() => import("./ReplyChain"));
const ReplyList = ({ replies, user, originalAuthorId }) => {
  return (
    <div className="flex flex-col border-t border-slate-300 py-3">
      {Object.keys(replies).length ? (
        <Suspense
          fallback={
            <div className="w-10 h-10">
              <LoadingSvg />
            </div>
          }
        >
          <div>
            <h3 className="text-3xl font-semibold text-slate-900 mb-5">
              Insights
            </h3>
            {Object.keys(replies).map((chainId) => {
              return (
                <ReplyChain
                  reply={replies[chainId]}
                  key={chainId}
                  user={user}
                  originalAuthorId={originalAuthorId}
                />
              );
            })}
          </div>
        </Suspense>
      ) : (
        <div className="flex justify-center m-3 italic">
          No replies yet. {user ? "Chime in!" : "Log in to add your own!"}
        </div>
      )}
    </div>
  );
};

export default ReplyList;
