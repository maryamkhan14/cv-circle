import { describe, expect, vi, test, beforeEach } from "vitest";
import makeRemovePost from "./remove-post";
import { makeFakeRawPost } from "../../__test__/fixtures/post.js";
describe("Remove post use case", () => {
  let postsDb;
  let removePost;
  beforeEach(() => {
    let remove = vi.fn(async (id) => {
      return { data: null, error: null };
    });
    postsDb = { remove };
    removePost = makeRemovePost({ postsDb });
  });
  test("Removes post successfully", async () => {
    let post = makeFakeRawPost();
    let expected = post;
    let actual = await removePost(post);
    let postsDbRemoveArgs = postsDb.remove.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(postsDb.remove).toBeCalledTimes(1);
    expect(postsDbRemoveArgs).toEqual(post.id);
  });
  test("Throws error when database deletion fails", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null });
    let error = { message: "Post deletion error message" };
    postsDb.remove.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(removePost(post)).rejects.toThrow(
      `Error deleting post from database: ${error.message}. Post deletion failed.`
    );
  });
});
