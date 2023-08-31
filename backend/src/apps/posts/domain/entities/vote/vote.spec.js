import { describe, expect, it } from "vitest";
import { makeFakeRawVote } from "../../../__test__/fixtures/vote";
import makeVote from "./";

describe("Vote entity tests", () => {
  it("throws error without an associated user ID", () => {
    const vote = makeFakeRawVote({ userId: null });
    expect(() => makeVote(vote)).toThrow(
      "Vote must have an associated user ID."
    );
  });

  it("throws error without a post ID", () => {
    const vote = makeFakeRawVote({ postId: null });
    expect(() => makeVote(vote)).toThrow("Vote must have an associated post.");
  });

  it("can set vote count", () => {
    const vote = makeFakeRawVote();
    const fakeVote = makeVote(vote);
    fakeVote.setVoteCount(4);
    expect(fakeVote.getVoteCount()).toBe(4);
  });

  it("can get DTO", () => {
    const vote = makeFakeRawVote();
    const fakeVote = makeVote(vote);
    expect(fakeVote.getDTO()).toEqual(vote);
  });
});
