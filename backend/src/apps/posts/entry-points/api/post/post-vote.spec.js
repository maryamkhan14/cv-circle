import { describe, expect, afterEach, vi, test, it } from "vitest";
import { makeFakeRawVote } from "../../../__test__/fixtures/vote";
import { postVote } from "../post-controller";
import { votePost } from "../../../domain/use-cases/";
vi.mock("../../../domain/use-cases/");

describe("Controller for POST to /vote endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const vote = makeFakeRawVote();
  test("Successfully votes on post", async () => {
    votePost.mockResolvedValue(vote);
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
  it("returns expected response error when exception is thrown", async () => {
    const error = {
      message: "Error thrown by POST /api/vote/ controller",
    };
    votePost.mockImplementation(async () => {
      throw new Error(error.message);
    });
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
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await postVote(request);
    expect(actual).toEqual(expected);
  });
});
