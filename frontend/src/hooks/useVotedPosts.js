import { useState } from "react";

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
    setVotes((prevPosts) => new Set(posts));
    sessionStorage.setItem(voteType, JSON.stringify([...posts.values()]));
  };

  return [votes, setVotesRecord];
}
