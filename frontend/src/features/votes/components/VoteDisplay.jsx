import React from "react";
import { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";

const VoteDisplay = ({ existingUpvoteCount }) => {
  const [user] = useOutletContext();
  const { id: postId } = useParams();
  const [upvoteCount, setUpvoteCount] = useState(existingUpvoteCount);
  const [currentVote, setCurrentVote] = useState(0);
  return (
    <div className="flex flex-col max-w-auto h-full rounded-lg justify-center items-center">
      <UpvoteButton
        postId={postId}
        setUpvoteCount={setUpvoteCount}
        voteContext={[currentVote, setCurrentVote]}
      />
      <p
        className={`text-slate-900 flex self-center items-center p-1 text-2xl`}
      >
        {upvoteCount}
      </p>
      <DownvoteButton
        postId={postId}
        setUpvoteCount={setUpvoteCount}
        voteContext={[currentVote, setCurrentVote]}
      />
    </div>
  );
};

export default VoteDisplay;
