import { describe, expect, beforeEach, vi, test } from "vitest";
import { makeFakeRawPost } from "../__test__/fixtures/post";
import { makeFakeImageEntity as makeFakeImage } from "../__test__/fixtures/image";
import makePostPost from "./post-post";

describe("Controller for POST to /post endpoint", () => {
  let previewImage = makeFakeImage();
  let handleAttachmentPreview = vi.fn(async () => previewImage);
  let createPost = vi.fn(async (post) => post);
  let postPost;
  beforeEach(() => {
    postPost = makePostPost({ createPost, handleAttachmentPreview });
  });

  test("Successfully creates a post", async () => {
    const post = makeFakeRawPost();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: post,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { posted: { ...post, imgCdn: previewImage.getCdn() } },
    };
    const actual = await postPost(request);
    expect(actual).toEqual(expected);
  });
});
