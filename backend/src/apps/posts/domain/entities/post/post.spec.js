import { describe, expect, test } from "vitest";
import { makeFakeRawPost } from "../../../__test__/fixtures/post";
import makePost from "./";

describe("post", () => {
  test("must have an author", () => {
    const post = makeFakeRawPost({ userId: null });
    expect(() => makePost(post)).toThrow("Post must have an author.");
  });

  test("must have a title", () => {
    const post = makeFakeRawPost({ title: null });
    expect(() => makePost(post)).toThrow("Post must have a title.");
  });

  test("must have content", () => {
    const post = makeFakeRawPost({ postContent: null });
    expect(() => makePost(post)).toThrow("Post must have content.");
  });

  test("must have image CDN", () => {
    const post = makeFakeRawPost({ imgCdn: null });
    expect(() => makePost(post)).toThrow("Post must have image.");
  });

  test("can set image", () => {
    const post = makeFakeRawPost();
    const fakePost = makePost(post);
    fakePost.setImage(null);
    expect(fakePost.getImage()).toBe(null);
  });

  test("can set creation timestamp", () => {
    const post = makeFakeRawPost();
    const fakePost = makePost(post);
    fakePost.setCreatedAt(null);
    expect(fakePost.getCreatedAt()).toBe(null);
  });

  test("can set post ID", () => {
    const post = makeFakeRawPost();
    const fakePost = makePost(post);
    fakePost.setId(null);
    expect(fakePost.getId()).toBe(null);
  });

  test("can get DTO", () => {
    const post = makeFakeRawPost();
    const fakePost = makePost(post);
    expect(fakePost.getDTO()).toEqual(post);
  });
});
