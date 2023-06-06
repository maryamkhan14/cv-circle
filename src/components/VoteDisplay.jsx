import React from "react";
import { useEffect, useState } from "react";
import { upvotePost, checkHasUpvoted } from "../services";

const VoteDisplay = ({ postId, userId, existingUpvoteCount }) => {
  const [upvoteCount, setUpvoteCount] = useState(existingUpvoteCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvoteClick = async () => {
    if (userId) {
      //TODO: Add error handling
      const { data: newUpvotes, error } = await upvotePost(postId, {
        userId,
      });
      if (newUpvotes) {
        setUpvoteCount(newUpvotes);
        setUpvotedStatus(true);
      } else {
        console.log(error);
        setError({ category: "upvote", msg: "Upvoting failed." });
      }
    }
  };
  const setUpvotedStatus = async () => {
    //TODO: Improve by implementing stored function that returns join of upvotes and posts
    const { data, error } = await checkHasUpvoted(postId, {
      userId,
    });
    if (data) {
      setHasUpvoted(data.length && Object.keys(...data).length ? true : false);
    } else {
      //TODO: handle error
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId && userId) {
      setUpvotedStatus();
    }
  }, [postId]);
  return (
    <div
      className={`${
        userId ? "hover:cursor-pointer" : "hover:cursor-auto"
      } flex flex-col max-w-auto h-full rounded-lg justify-center items-center `}
      onClick={handleUpvoteClick}
    >
      <button
        aria-label="Upvote post"
        onClick={handleUpvoteClick}
        className="flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className={`w-10 h-10 stroke-slate-900 ${
            hasUpvoted ? "fill-amber-100" : "fill-slate-100"
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
        {existingUpvoteCount}
      </p>

      <button
        aria-label="Downvote post"
        className="flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className={`w-10 h-10 stroke-slate-900 ${
            hasUpvoted ? "fill-amber-100" : "fill-slate-100"
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
