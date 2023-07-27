import { describe, expect, beforeEach, vi, test } from "vitest";
import { makeFakeRawPost } from "../../../__test__/fixtures/post";
import makeDeletePost from "./delete-post";

describe("Controller for DELETE to /api/posts/:id endpoint", () => {
  let removePost = vi.fn(async (post) => {
    return post;
  });
  let deletePost;

  beforeEach(() => {
    deletePost = makeDeletePost({ removePost });
  });
  test("Refuses to update a post without valid user credentials", async () => {
    const post = makeFakeRawPost();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { ...post },
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: "Not authorized to perform this action." },
    };
    const actual = await deletePost(request);
    expect(actual).toEqual(expected);
  });
  test("Successfully deletes a post", async () => {
    const post = makeFakeRawPost();
    const user = { userId: post.userId };
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { ...post },
      user,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { deleted: post },
    };
    const actual = await deletePost(request);
    expect(actual).toEqual(expected);
  });

  test("Returns expected response error when exception is thrown", async () => {
    const error = {
      message: "Error thrown by DELETE /api/posts/:id controller",
    };
    removePost.mockImplementation(async () => {
      throw new Error(error.message);
    });
    const post = makeFakeRawPost();
    const user = { userId: post.userId };
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { ...post },
      user,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await deletePost(request);
    expect(actual).toEqual(expected);
  });
});
