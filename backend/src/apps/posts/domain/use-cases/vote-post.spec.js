import { describe, expect, vi, it, afterEach } from "vitest";
import { votePost } from ".";
import { votesDb } from "../../data-access";
import { makeFakeRawVote } from "../../__test__/fixtures/vote.js";
vi.mock("../../data-access");

describe("Vote post use case tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("votes on post successfully", async () => {
    votesDb.vote.mockResolvedValue({ data: null, error: null });
    let vote = makeFakeRawVote();
    let expected = vote;
    let actual = await votePost(vote);
    let votesDbVoteArgs = votesDb.vote.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(votesDb.vote).toBeCalledTimes(1);
    expect(vote).toContain(votesDbVoteArgs);
  });
  it("throws error when database save fails", async () => {
    let vote = makeFakeRawVote();
    let error = { message: "Vote save error message" };
    votesDb.vote.mockResolvedValue({ data: null, error });

    expect(votePost(vote)).rejects.toThrow(
      `Error voting on post: ${error.message}. Post vote failed.`
    );
  });
});
