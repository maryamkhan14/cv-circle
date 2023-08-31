import { describe, expect, vi, it, afterEach } from "vitest";
import { removePost } from "../../../domain/use-cases/";
import { makeFakeRawPost } from "../../../__test__/fixtures/post";
import { deletePost } from "../post-controller";
vi.mock("../../../domain/use-cases/");
describe("Controller for DELETE to /api/posts/:id endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("successfully deletes a post", async () => {
    removePost.mockResolvedValue(makeFakeRawPost());
    const post = makeFakeRawPost();
    const user = { userId: post.userId };
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: { id: post.id },
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

  it("returns expected response error when exception is thrown", async () => {
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
      params: { id: post.id },
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
