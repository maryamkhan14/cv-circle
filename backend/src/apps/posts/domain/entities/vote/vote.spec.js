import { describe, expect, test } from "vitest";
import { makeFakeRawVote } from "../../../__test__/fixtures/vote";
import makeVote from "./";

describe("vote", () => {
  test("must have an associated user ID", () => {
    const vote = makeFakeRawVote({ userId: null });
    expect(() => makeVote(vote)).toThrow(
      "Vote must have an associated user ID."
    );
  });

  test("must have a post ID", () => {
    const vote = makeFakeRawVote({ postId: null });
    expect(() => makeVote(vote)).toThrow("Vote must have an associated post.");
  });

  test("can set vote count", () => {
    const vote = makeFakeRawVote();
    const fakeVote = makeVote(vote);
    fakeVote.setVoteCount(4);
    expect(fakeVote.getVoteCount()).toBe(4);
  });

  test("can get DTO", () => {
    const vote = makeFakeRawVote();
    const fakeVote = makeVote(vote);
    expect(fakeVote.getDTO()).toEqual(vote);
  });
});
