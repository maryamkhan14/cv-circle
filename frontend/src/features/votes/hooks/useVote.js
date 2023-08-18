import { useState } from "react";
export function useVote(userId, postId, voteCount) {
  const [vote, setVote] = useState({
    userId: userId || "",
    postId: postId || 0,
    voteCount: voteCount || 0,
  });
  const adjustVote = (voteAdjustment) => {
    if (userId && postId) {
      setVote((prevVote) => {
        return { ...prevVote, voteCount: vote.voteCount + voteAdjustment };
      });
    }
  };
  return [vote, adjustVote];
}
