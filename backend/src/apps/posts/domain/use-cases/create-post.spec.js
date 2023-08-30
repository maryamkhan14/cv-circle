import { describe, expect, vi, it, afterEach } from "vitest";
import { postsDb } from "../../data-access";
import { createPost } from ".";
import { makeFakeRawPost } from "../../__test__/fixtures/post.js";
vi.mock("../../data-access");

describe("Create post use case tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("creates post successfully", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null, upvoteCount: 0 });
    let expected = makeFakeRawPost({ upvoteCount: 0 });
    postsDb.insert.mockReturnValue({
      data: [expected],
      error: null,
    });
    let actual = await createPost(post);
    let postsDbInsertArgs = postsDb.insert.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(postsDb.insert).toBeCalledTimes(1);
    expect(post).toContain(postsDbInsertArgs);
  });
  it("throws error when database save fails", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null });
    let error = { message: "Post save error message" };
    postsDb.insert.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(createPost(post)).rejects.toThrow(
      `Error saving post to database: ${error.message}. Post creation failed.`
    );
  });
});
