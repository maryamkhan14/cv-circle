export default function buildMakeVote() {
  return function makeVote({ postId, userId, voteCount = 1 } = {}) {
    // No errors thrown for missing id, createdAt, because they are generated by the database.
    if (!postId) {
      throw new Error("Vote must have an associated post.");
    }
    if (!userId) {
      throw new Error("Vote must have an associated user ID.");
    }
    return Object.freeze({
      getPostId: () => postId,
      getUserId: () => userId,
      getVoteCount: () => voteCount,
      setVoteCount: (newVoteCount) => {
        voteCount = newVoteCount;
      },
      getDTO: () => {
        return {
          postId,
          userId,
          voteCount,
        };
      },
    });
  };
}
