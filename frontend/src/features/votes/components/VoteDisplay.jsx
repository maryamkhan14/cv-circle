import React from "react";
import { useEffect, useState } from "react";
import { useSessionStorage } from "../../../hooks";
import votePost from "../services/votePost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useOutletContext } from "react-router-dom";

const VoteDisplay = ({ existingUpvoteCount }) => {
  const [voteHistory, setVoteHistory] = useSessionStorage("voteHistory", {});
  const [user] = useOutletContext();
  const queryClient = useQueryClient();
  const { id: postId } = useParams();
  const [upvoteCount, setUpvoteCount] = useState(existingUpvoteCount);
  const [currentVote, setCurrentVote] = useState(0);

  //TODO: Make loading indication
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: votePost,
    onMutate: () => {
      let u = new Set(voteHistory?.upvoted);
      let d = new Set(voteHistory?.downvoted);
      if (voteHistory) {
        if (currentVote === 0) {
          // remove current post from upvoted and downvoted
          u.delete(postId);
          d.delete(postId);
        } else if (currentVote === 1) {
          u.add(postId);
        } else if (currentVote === -1) {
          d.add(postId);
        }
      }
      return { upvoted: u, downvoted: d };
    },
    onSuccess: (data, variables, context) => {
      let newVotes = { ...context };
      setVoteHistory(
        Object.keys(newVotes).reduce((next, key) => {
          return { ...next, [key]: Array.from(newVotes[key]) };
        }, {})
      );
    },
  });
  const adjustVote = (voteAdjustment) => {
    // reverse effect if user is clicking on the same vote button
    if (voteAdjustment == currentVote) voteAdjustment = -voteAdjustment;
    setCurrentVote((prev) => prev + voteAdjustment);
    mutateAsync({ userId: user?.userId, postId, voteCount: voteAdjustment });
    setUpvoteCount(upvoteCount + voteAdjustment);
  };

  useEffect(() => {
    if (user) {
      setCurrentVote(
        user.voteHistory.upvoted.has(postId)
          ? 1
          : user.voteHistory.downvoted.has(postId)
          ? -1
          : 0
      );
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
            currentVote === 1 ? "fill-amber-100" : "fill-slate-100"
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
            currentVote === -1 ? "fill-amber-100" : "fill-slate-100"
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
