import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useVoteMutation from "../hooks/useVoteMutation";
const DownvoteButton = ({ postId, setUpvoteCount, voteContext }) => {
  const queryClient = useQueryClient();
  let { voteHistory, userId } = queryClient.getQueryData(["user"]) || {};
  const [currentVote, setCurrentVote] = voteContext;
  let upvoted = new Set(voteHistory?.upvoted);
  let downvoted = new Set(voteHistory?.downvoted);
  const {
    isLoading,
    isError,
    mutateAsync: downvote,
  } = useVoteMutation({
    upvoted,
    downvoted,
  });
  const handleDownvoteClick = (e) => {
    e.preventDefault();
    if (userId) {
      let adjustment = downvoted.has(postId) ? 1 : -1;
      setCurrentVote((prev) => (prev === -1 ? 0 : -1));
      setUpvoteCount((prev) => prev + adjustment);
      downvote({ postId, userId, voteCount: adjustment });
    }
  };
  useEffect(() => {
    if (isError) {
      setCurrentVote((prev) => (prev === -1 ? 0 : -1));
    }
  }, [isError]);
  useEffect(() => {
    setCurrentVote((prev) =>
      upvoted.has(postId) ? 1 : downvoted.has(postId) ? -1 : 0
    );
  }, []);
  return (
    <button
      aria-label="Downvote post"
      onClick={handleDownvoteClick}
      className={`${
        userId ? "hover:cursor-pointer" : "hover:cursor-auto"
      } flex items-center justify-center`}
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
  );
};

export default DownvoteButton;
