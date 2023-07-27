import makeVote from "../entities/vote/index.js";
export default function makeVotePost({ votesDb }) {
  return async function votePost(voteDetails) {
    const vote = makeVote(voteDetails);
    let { error } = await votesDb.vote(vote);
    if (error) {
      throw new Error(
        `Error voting on post: ${error.message}. Post vote failed.`
      );
    }
    return { ...vote.getDTO() };
  };
}
