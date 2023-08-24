import votePost from "../services/votePost";
import { useSessionStorage } from "../../../hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function useVoteMutation({ upvoted, downvoted }) {
  const queryClient = useQueryClient();
  const [, setVoteHistory] = useSessionStorage("voteHistory", {});
  return useMutation({
    mutationFn: votePost,
    onMutate: ({ voteCount, postId }) => {
      const previousVotes = {
        upvoted: [...upvoted],
        downvoted: [...downvoted],
      };
      if (voteCount === 1) {
        !upvoted.has(postId) && !downvoted.has(postId)
          ? upvoted.add(postId)
          : upvoted.delete(postId);
        downvoted.delete(postId);
      } else if (voteCount === -1) {
        !upvoted.has(postId) && !downvoted.has(postId)
          ? downvoted.add(postId)
          : downvoted.delete(postId);
        upvoted.delete(postId);
      }
      return {
        previousVotes,
        newVotes: { upvoted: [...upvoted], downvoted: [...downvoted] },
      };
    },
    onSuccess: (data, variables, context) => {
      let { newVotes } = context;
      queryClient.setQueryData(["user"], (user) => {
        return { ...user, voteHistory: newVotes };
      });
      queryClient.setQueryData(["post", data.voted.postId], (post) => {
        return { ...post, upvoteCount: post.upvoteCount + variables.voteCount };
      });
      // update session storage in case of refresh
      setVoteHistory(newVotes);
    },
    onError: (err, variables, context) => {
      let { previousVotes } = context;
      queryClient.setQueryData(["user"], (user) => {
        return { ...user, voteHistory: previousVotes };
      });
      queryClient.setQueryData(["post", data.voted.postId], (post) => {
        return { ...post, upvoteCount: post.upvoteCount - variables.voteCount };
      });
      // update session storage in case of refresh
      setVoteHistory(previousVotes);
    },
  });
}
