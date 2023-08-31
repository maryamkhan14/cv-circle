import { describe, expect, afterEach, vi, it } from "vitest";
import { getAllPosts } from "../post-controller";
import { retrievePosts } from "../../../domain/use-cases/";
vi.mock("../../../domain/use-cases/");

describe("Controller for GET to /posts endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("Successfully makes a call to retrievePosts and formats response as expected", async () => {
    retrievePosts.mockResolvedValue([]);
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { posts: [] },
    };
    const actual = await getAllPosts();
    expect(actual).toEqual(expected);
    expect(retrievePosts).toBeCalledTimes(1);
  });
  it("returns expected response error when exception is thrown", async () => {
    const error = {
      message: "Error thrown by GET /api/posts/ controller",
    };
    retrievePosts.mockImplementation(async () => {
      throw new Error(error.message);
    });
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await getAllPosts();
    expect(actual).toEqual(expected);
  });
});
