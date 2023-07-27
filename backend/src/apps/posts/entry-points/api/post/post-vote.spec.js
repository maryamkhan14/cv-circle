import { describe, expect, beforeEach, vi, test } from "vitest";
import { makeFakeRawVote } from "../../../__test__/fixtures/vote";
import makeVotePost from "./vote-post";

describe("Controller for POST to /vote endpoint", () => {
  let votePost = vi.fn(async (post) => post);
  let postVote;
  beforeEach(() => {
    postVote = makeVotePost({ votePost });
  });

  test("Successfully votes on post", async () => {
    const vote = makeFakeRawVote();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: vote,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { voted: vote },
    };
    const actual = await postVote(request);
    expect(actual).toEqual(expected);
  });
});
