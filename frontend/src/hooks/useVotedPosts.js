import { useState, useEffect } from "react";

function getRecordOrDefault(voteType) {
  const stored = sessionStorage.getItem(voteType);
  if (!stored) {
    return new Set([]);
  }
  return new Set(JSON.parse(stored));
}

export function useVotedPosts(voteType) {
  const [votes, setVotes] = useState(getRecordOrDefault(voteType));

  const setVotesRecord = (posts) => {
    let newPosts = new Set(posts);
    setVotes((prevPosts) => newPosts);
    sessionStorage.setItem(voteType, JSON.stringify([...newPosts.values()]));
  };

  return [votes, setVotesRecord];
}
