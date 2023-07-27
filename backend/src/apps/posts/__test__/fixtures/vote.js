import { FAKE_POST_ID, FAKE_USER_ID, FAKE_VOTE_COUNT } from "./constants";

// Make the object that will be passed into vote entity factory function
export function makeFakeRawVote(overrides) {
  const vote = {
    postId: FAKE_POST_ID,
    userId: FAKE_USER_ID,
    voteCount: FAKE_VOTE_COUNT,
  };
  return { ...vote, ...overrides };
}

// Make the object that will be returned by the vote entity factory function -TODO: rename for clarity
export function makeFakeVoteEntity(overrides) {
  let postId =
    overrides && overrides.hasOwnProperty("postId")
      ? overrides.postId
      : FAKE_POST_ID;
  let userId =
    overrides && overrides.hasOwnProperty("userId")
      ? overrides.userId
      : FAKE_USER_ID;
  let voteCount =
    overrides && overrides.hasOwnProperty("voteCount")
      ? overrides.voteCount
      : FAKE_VOTE_COUNT;
  const vote = {
    getPostId: () => postId,
    getUserId: () => userId,
    getVoteCount: () => voteCount,
    getDTO: () => {
      return { postId, userId, voteCount };
    },
  };

  return vote;
}
