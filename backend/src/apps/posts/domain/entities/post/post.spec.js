import { describe, expect, it, vi, afterEach } from "vitest";
import {
  makeFakeRawPost,
  makeFakePostEntity,
} from "../../../__test__/fixtures/post";
import makePost from "./";

describe("Post entity tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sets isReply to boolean result of regex match test if isReply exists", () => {
    const inputDetails = makeFakeRawPost({ isReply: "true" });
    const post = makePost(inputDetails);
    expect(post.isReply()).toEqual(true);
  });

  it("throws error without an author", () => {
    const inputDetails = makeFakeRawPost({ userId: null });
    expect(() => makePost(inputDetails)).toThrow("Post must have an author.");
  });

  it("throws error without title if post is not a reply", () => {
    const inputDetails = makeFakeRawPost({ title: null, isReply: false });
    expect(() => makePost(inputDetails)).toThrow("Post must have a title.");
  });

  it("does not throw error for title if post is a reply", () => {
    const overrides = { title: null, isReply: true };
    const expectedPost = makeFakePostEntity(overrides);
    const inputDetails = makeFakeRawPost({ ...overrides });
    const actual = makePost(inputDetails);
    expect(actual.getDTO()).toEqual(expectedPost.getDTO());
  });

  it("throws error without post content", () => {
    const inputDetails = makeFakeRawPost({ postContent: null });
    expect(() => makePost(inputDetails)).toThrow("Post must have content.");
  });

  it("throws error without image CDN if post is not a reply", () => {
    const inputDetails = makeFakeRawPost({ imgCdn: null });
    expect(() => makePost(inputDetails)).toThrow("Post must have image.");
  });

  it("does not throw error for image CDN if post is a reply", () => {
    const overrides = { imgCdn: null, isReply: true };
    const expectedPost = makeFakePostEntity(overrides);
    const inputDetails = makeFakeRawPost(overrides);
    const actual = makePost(inputDetails);
    expect(actual.getDTO()).toEqual(expectedPost.getDTO());
  });

  it("correctly sets replies JSON property if replies argument is JSON string", () => {
    const replies = { 2: makeFakeRawPost({ id: 2 }) };
    const overrides = { replies: JSON.stringify(replies) };
    const expectedPost = makeFakePostEntity({ replies });
    const inputDetails = makeFakeRawPost(overrides);
    const actual = makePost(inputDetails);
    expect(actual.getDTO()).toEqual(expectedPost.getDTO());
  });

  it("sets replies to an empty object if replies argument is not an object", () => {
    const overrides = { replies: null };
    const expectedPost = makeFakePostEntity();
    const inputDetails = makeFakeRawPost(overrides);
    const actual = makePost(inputDetails);
    expect(actual.getDTO()).toEqual(expectedPost.getDTO());
  });

  it("sets image", () => {
    const inputDetails = makeFakeRawPost();
    const post = makePost(inputDetails);
    post.setImage(null);
    expect(post.getImage()).toBe(null);
  });

  it("sets creation timestamp", () => {
    const inputDetails = makeFakeRawPost();
    const post = makePost(inputDetails);
    post.setCreatedAt(null);
    expect(post.getCreatedAt()).toBe(null);
  });

  it("sets post ID", () => {
    const inputDetails = makeFakeRawPost();
    const post = makePost(inputDetails);
    post.setId(null);
    expect(post.getId()).toBe(null);
  });

  it("sets path", () => {
    const inputDetails = makeFakeRawPost();
    const post = makePost(inputDetails);
    post.setPath("1.2");
    expect(post.getPath()).toEqual("1.2");
  });

  it("sets upvoteCount to 0 by default", () => {
    const inputDetails = makeFakeRawPost({ upvoteCount: null });
    const post = makePost(inputDetails);
    expect(post.getUpvoteCount()).toEqual(0);
  });
  it("successfully retrieves post replies", () => {
    const replies = { 2: makeFakeRawPost() };
    const inputDetails = makeFakeRawPost({ replies });
    const post = makePost(inputDetails);
    expect(post.getReplies()).toEqual(replies);
  });
  it("successfully retrieves DTO", () => {
    const inputDetails = makeFakeRawPost();
    const post = makePost(inputDetails);
    expect(post.getDTO()).toEqual(inputDetails);
  });
});
