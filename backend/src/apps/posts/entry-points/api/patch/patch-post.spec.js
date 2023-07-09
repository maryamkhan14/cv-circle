import { describe, expect, beforeEach, vi, test } from "vitest";
import { makeFakeRawPost } from "../__test__/fixtures/post";
import { makeFakeImageEntity as makeFakeImage } from "../__test__/fixtures/image";
import makePatchPost from "./patch-post";

describe("Controller for PATCH to /api/posts/:id endpoint", () => {
  let previewImage = makeFakeImage();
  let handleAttachmentPreview = vi.fn(async () => previewImage);
  let updatePost = vi.fn(async (post) => post);
  let patchPost;

  beforeEach(() => {
    patchPost = makePatchPost({ updatePost, handleAttachmentPreview });
  });
  test("Successfully updates a post when new attachment is provided", async () => {
    const post = makeFakeRawPost();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { post, attachmentChanged: true },
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { updated: { ...post, imgCdn: previewImage.getCdn() } },
    };
    const actual = await patchPost(request);
    expect(actual).toEqual(expected);
  });

  test("Returns expected response error when exception is thrown", async () => {
    handleAttachmentPreview.mockImplementation(async () => {
      throw new Error(error.message);
    });
    let post = makeFakeRawPost();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { post, attachmentChanged: true },
    };
    const error = {
      message: "Error thrown by PATCH /api/posts/:id controller",
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await patchPost(request);
    expect(actual).toEqual(expected);
  });
});
