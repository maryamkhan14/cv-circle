import { describe, expect, vi, it, afterEach } from "vitest";
import { removePost } from ".";
import { makeFakeRawPost } from "../../__test__/fixtures/post.js";
import { postsDb } from "../../data-access";
vi.mock("../../data-access");

describe("Remove post use case tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("removes post successfully", async () => {
    let post = makeFakeRawPost();
    let expected = post;
    postsDb.remove.mockResolvedValue({ data: [post], error: null });
    let actual = await removePost(post.id, post.userId);
    let [removedPostId, removedPostAuthor] = postsDb.remove.mock.calls[0];
    expect(actual).toEqual(expected);
    expect(postsDb.remove).toBeCalledTimes(1);
    expect(removedPostId).toEqual(post.id);
    expect(removedPostAuthor).toEqual(post.userId);
  });
  it("throws error when database returns error", async () => {
    let post = makeFakeRawPost();
    let error = { message: "Post deletion error message" };
    postsDb.remove.mockResolvedValueOnce({ data: null, error });
    expect(removePost(post.id, post.userId)).rejects.toThrow(
      `Error deleting post from database: ${error.message}. Post deletion failed.`
    );
  });
  it("throws error when database deletion fails", async () => {
    let post = makeFakeRawPost();
    postsDb.remove.mockResolvedValueOnce({ data: null, error: null });

    expect(removePost(post.id, post.userId)).rejects.toThrow(
      `Error deleting post from database: either the post does not exist, or it does not belong to the user.`
    );
  });
});
