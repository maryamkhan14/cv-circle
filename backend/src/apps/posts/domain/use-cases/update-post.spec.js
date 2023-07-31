import { describe, expect, vi, test, beforeEach } from "vitest";
import makeUpdatePost from "./update-post";
import { makeFakeRawPost } from "../../__test__/fixtures/post.js";
describe("Update post use case", () => {
  let postsDb;
  let updatePost;
  beforeEach(() => {
    let update = vi.fn(async () => {
      return { data: null, error: null };
    });
    postsDb = { update };
    updatePost = makeUpdatePost({ postsDb });
  });
  test("Updates post successfully", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null, upvoteCount: 0 });
    let expected = post;
    let actual = await updatePost(post);
    let postsDbUpdateArgs = postsDb.update.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(postsDb.update).toBeCalledTimes(1);
    expect(post).toContain(postsDbUpdateArgs);
  });
  test("Throws error when database save fails", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null });
    let error = { message: "Post save error message" };
    postsDb.update.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(updatePost(post)).rejects.toThrow(
      `Error saving post to database: ${error.message}. Post update failed.`
    );
  });
});
