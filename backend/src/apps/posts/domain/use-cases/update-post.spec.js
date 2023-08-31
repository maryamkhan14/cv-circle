import { describe, expect, vi, it, afterEach } from "vitest";
import { updatePost } from ".";
import { postsDb } from "../../data-access";
import { makeFakeRawPost } from "../../__test__/fixtures/post.js";
vi.mock("../../data-access");
describe("Update post use case tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("updates post successfully", async () => {
    postsDb.update.mockResolvedValue({ data: null, error: null });
    let post = makeFakeRawPost({ id: null, createdAt: null, upvoteCount: 0 });
    let expected = post;
    let actual = await updatePost(post);
    let postsDbUpdateArgs = postsDb.update.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(postsDb.update).toBeCalledTimes(1);
    expect(post).toContain(postsDbUpdateArgs);
  });
  it("throws error when database save fails", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null });
    let error = { message: "Post save error message" };
    postsDb.update.mockResolvedValue({ data: null, error });
    expect(updatePost(post)).rejects.toThrow(
      `Error saving post to database: ${error.message}. Post update failed.`
    );
  });
});
