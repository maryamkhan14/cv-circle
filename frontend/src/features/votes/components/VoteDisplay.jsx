import React from "react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";

const VoteDisplay = ({ existingUpvoteCount }) => {
  const queryClient = useQueryClient();
  const { id: postId } = useParams();
  const [upvoteCount, setUpvoteCount] = useState(existingUpvoteCount);
  const [currentVote, setCurrentVote] = useState(0);
  useEffect(() => {
    queryClient.setQueryData(["posts"], (posts) =>
      posts?.reduce((allPosts, currentPost) => {
        if (currentPost.id.toString() === postId)
          currentPost = { ...currentPost, upvoteCount };
        return [...allPosts, currentPost];
      }, [])
    );
  }, [upvoteCount]);
  return (
    <div className="flex flex-row md:flex-col w-1/5 gap-2 md:w-auto max-w-auto rounded-lg items-center md:gap-0 justify-between md:justify-center">
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
