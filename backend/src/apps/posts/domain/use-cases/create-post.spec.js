import { describe, expect, vi, test, beforeEach } from "vitest";
import makeCreatePost from "./create-post";
import {
  makeFakeRawPost,
  makeFakePostEntity,
} from "../../__test__/fixtures/post.js";
describe("Create post use case", () => {
  let postsDb;
  let createPost;
  beforeEach(() => {
    let insert = vi.fn(async () => {
      return { data: makeFakeRawPost(), error: null };
    });
    postsDb = { insert };
    createPost = makeCreatePost({ postsDb });
  });
  test("Creates post successfully", async () => {
    let post = makeFakeRawPost({ id: null, createdAt: null });

    let expected = makeFakeRawPost();
    let actual = await createPost(post);
    let postsDbInsertArgs = postsDb.insert.mock.calls[0][0];
    expect(actual).toEqual(expected);
    expect(postsDb.insert).toBeCalledTimes(1);
    expect(post).toContain(postsDbInsertArgs);
  });
});
