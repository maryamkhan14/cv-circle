import { describe, expect, vi, test, beforeEach } from "vitest";
import makeVotePost from "./vote-post";
import { makeFakeRawVote } from "../../__test__/fixtures/vote.js";
describe("Vote post use case", () => {
  let votesDb;
  let votePost;
  beforeEach(() => {
    let vote = vi.fn(async (voteDetails) => {
      return { data: null, error: null };
    });
    votesDb = { vote };
    votePost = makeVotePost({ votesDb });
  });
  test("Votes on post successfully", async () => {
    let vote = makeFakeRawVote();
    let expected = vote;
    let actual = await votePost(vote);
    let votesDbVoteArgs = votesDb.votes.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(votesDb.vote).toBeCalledTimes(1);
    expect(vote).toContain(votesDbVoteArgs);
  });
  test("Throws error when database save fails", async () => {
    let vote = makeFakeRawVote();
    let error = { message: "Vote save error message" };
    votesDb.vote.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(votePost(vote)).rejects.toThrow(
      `Error voting on post: ${error.message}. Post vote failed.`
    );
  });
});
