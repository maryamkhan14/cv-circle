import { describe, expect, afterEach, vi, it } from "vitest";
import { makeFakeRawPost } from "../../../__test__/fixtures/post";
import { makeFakeImageEntity } from "../../../__test__/fixtures/image";
import { postPost } from "../post-controller";
import {
  createPost,
  handleAttachmentPreview,
} from "../../../domain/use-cases/";
vi.mock("../../../domain/use-cases/");

describe("Controller for POST to /post endpoint", () => {
  let previewImage = makeFakeImageEntity();
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("successfully creates a post when new file is attached", async () => {
    const post = makeFakeRawPost();
    createPost.mockResolvedValue(post);
    handleAttachmentPreview.mockResolvedValue(previewImage);
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

  it("successfully creates a post when no file is attached", async () => {
    const post = makeFakeRawPost();
    createPost.mockResolvedValue(post);
    handleAttachmentPreview.mockResolvedValue(null);
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
      body: { posted: { ...post } },
    };
    const actual = await postPost(request);
    expect(actual).toEqual(expected);
  });

  it("returns expected response error when exception is thrown", async () => {
    const error = {
      message: "Error thrown by POST /api/posts/ controller",
    };
    handleAttachmentPreview.mockImplementation(async () => {
      throw new Error(error.message);
    });
    const post = makeFakeRawPost({ file: "fakeFile" });
    const user = { userId: post.userId };
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: { ...post },
      user,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await postPost(request);
    expect(actual).toEqual(expected);
  });
});
