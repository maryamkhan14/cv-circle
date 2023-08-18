import React from "react";
import { useEffect, useState, useContext } from "react";
import { useVote } from "../hooks/useVote.js";
import { votePost } from "../../posts/services/index.js";
import { useVotedPosts } from "../../../hooks";
import { UserContext } from "../../authentication/context/UserContext.jsx";
import { useParams } from "react-router-dom";

const VoteDisplay = ({ existingUpvoteCount }) => {
  const [allUpvoted, setAllUpvoted] = useVotedPosts("upvoted");
  const [allDownvoted, setAllDownvoted] = useVotedPosts("downvoted");
  const { user } = useContext(UserContext);
  const { id: postId } = useParams();
  const [upvoteCount, setUpvoteCount] = useState(existingUpvoteCount);
  const [currentVote, setCurrentVote] = useVote(
    user.userId,
    postId,
    allUpvoted.has(postId) ? 1 : allDownvoted.has(postId) ? -1 : 0
  );
  const adjustVote = (voteAdjustment) => {
    // reverse effect if user is clicking on the same vote button
    if (voteAdjustment == currentVote.voteCount)
      voteAdjustment = -voteAdjustment;
    votePost({ ...currentVote, voteCount: voteAdjustment });
    setCurrentVote(voteAdjustment);
    setUpvoteCount(upvoteCount + voteAdjustment);
  };

  useEffect(() => {
    switch (currentVote.voteCount) {
      case 0:
        // remove current post from allUpvoted and allDownvoted
        setAllUpvoted([...allUpvoted.values()].filter((id) => id !== postId));
        setAllDownvoted(
          [...allDownvoted.values()].filter((id) => id !== postId)
        );
        break;
      case 1:
        setAllUpvoted([...allUpvoted.values(), postId]);
        break;
      case -1:
        setAllDownvoted([...allDownvoted.values(), postId]);
        break;
    }
  }, [currentVote]);

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
            currentVote.voteCount === 1 ? "fill-amber-100" : "fill-slate-100"
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
            currentVote.voteCount === -1 ? "fill-amber-100" : "fill-slate-100"
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
