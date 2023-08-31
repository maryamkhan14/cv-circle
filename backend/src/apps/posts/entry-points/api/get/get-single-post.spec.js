import { describe, it, vi, expect, afterEach } from "vitest";
import { retrieveSinglePost } from "../../../domain/use-cases/";
import { getSinglePost } from "../post-controller";
import { makeFakeRawPost } from "../../../__test__/fixtures/post";
vi.mock("../../../domain/use-cases/");

describe("Controller for GET to /post endpoint", () => {
  let post = makeFakeRawPost();
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("successfully gets single post", async () => {
    retrieveSinglePost.mockResolvedValue(makeFakeRawPost());
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
  it("returns expected response error when exception is thrown", async () => {
    const postId = 1;
    const error = {
      message: "Error thrown by GET /api/posts/:id controller",
    };
    retrieveSinglePost.mockImplementation(async () => {
      throw new Error(error.message);
    });
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
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await getSinglePost(request);
    expect(actual).toEqual(expected);
  });
});
