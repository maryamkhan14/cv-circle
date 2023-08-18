import Reply from "./Reply";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../authentication/context/UserContext";

const ReplyList = ({ replies }) => {
  const { user } = useContext(UserContext);
  const [replyList, setReplyList] = useState([]);
  return (
    <div className="flex flex-col border-t border-slate-300 py-3">
      {Object.keys(replies).length ? (
        <div>
          <h3 className="text-3xl font-semibold text-slate-900 mb-5">
            {" "}
            Insights{" "}
          </h3>
          {Object.keys(replies).map((chainId) => {
            return <Reply reply={replies[chainId]} key={chainId} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center m-3 italic">
          No replies yet.{" "}
          {Object.keys(user).length ? "Chime in!" : "Log in to add your own!"}
        </div>
      )}
    </div>
  );
};

export default ReplyList;
