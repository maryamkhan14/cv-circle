import React from "react";
import { useEffect, useState, useContext } from "react";
import { votePost } from "../services";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

const VoteDisplay = ({ existingUpvoteCount, upvoters, downvoters }) => {
  const { user } = useContext(UserContext);
  const { id: postId } = useParams();

  const [upvoteCount, setUpvoteCount] = useState(existingUpvoteCount);
  const [vote, setVote] = useState({
    userId: user.userId,
    postId,
    voteCount: 0,
  });
  const adjustVote = (voteAdjustment) => {
    if (vote.userId && vote.postId) {
      if (vote.voteCount === voteAdjustment) {
        setVote({ ...vote, voteCount: 0 });
        votePost({ ...vote, voteCount: -voteAdjustment });
        setUpvoteCount(existingUpvoteCount + -voteAdjustment);
      } else {
        setVote({ ...vote, voteCount: voteAdjustment });
        votePost({ ...vote, voteCount: voteAdjustment });
        setUpvoteCount(existingUpvoteCount + voteAdjustment);
      }
    }
  };
  useEffect(() => {
    if (upvoters.includes(user.userId)) {
      setVote({ ...vote, voteCount: 1 });
    } else if (downvoters.includes(user.userId)) {
      setVote({ ...vote, voteCount: -1 });
    }
  }, [user]);
  return (
    <div
      className={`${
        user && user.userId ? "hover:cursor-pointer" : "hover:cursor-auto"
      } flex flex-col max-w-auto h-full rounded-lg justify-center items-center `}
    >
      <button
        aria-label="Upvote post"
        onClick={() => adjustVote(1)}
        className="flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className={`w-10 h-10 stroke-slate-900 ${
            vote.voteCount === 1 ? "fill-amber-100" : "fill-slate-100"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <p
        className={`text-slate-900 flex self-center items-center p-1 text-2xl`}
      >
        {upvoteCount}
      </p>

      <button
        aria-label="Downvote post"
        onClick={() => adjustVote(-1)}
        className="flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className={`w-10 h-10 stroke-slate-900 ${
            vote.voteCount === -1 ? "fill-amber-100" : "fill-slate-100"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default VoteDisplay;
