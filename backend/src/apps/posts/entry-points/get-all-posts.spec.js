import { describe, test, expect, vi, beforeEach } from "vitest";
import makeGetAllPosts from "./get-all-posts";
describe("Controller for GET to /posts endpoint", () => {
  let retrievePosts = vi.fn(async () => {
    return {};
  });
  let getAllPosts;
  beforeEach(() => {
    getAllPosts = makeGetAllPosts({ retrievePosts });
  });
  test("Successfully makes a call to retrievePosts and formats response as expected", async () => {
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { posts: {} },
    };
    const actual = await getAllPosts();
    expect(actual).toEqual(expected);
    expect(retrievePosts).toBeCalledTimes(1);
  });
});
