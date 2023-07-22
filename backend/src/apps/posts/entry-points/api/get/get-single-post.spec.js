import { describe, test, expect, vi, beforeEach } from "vitest";
import makeGetSinglePost from "./get-single-post";
import { makeFakePostEntity } from "../../../__test__/fixtures/post";
describe("Controller for GET to /post endpoint", () => {
  let post = { ...makeFakePostEntity().getDTO() };
  let retrieveSinglePost = vi.fn(async () => {
    return post;
  });

  let getSinglePost;
  beforeEach(() => {
    getSinglePost = makeGetSinglePost({ retrieveSinglePost });
  });

  test("Successfully gets single post", async () => {
    const postId = 1;
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: { postId },
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { post },
    };
    const actual = await getSinglePost(request);
    expect(actual).toEqual(expected);
  });
});
