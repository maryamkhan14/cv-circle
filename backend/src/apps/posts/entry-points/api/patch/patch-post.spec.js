import { describe, expect, afterEach, vi, it } from "vitest";
import { makeFakeRawPost } from "../../../__test__/fixtures/post";
import { makeFakeImageEntity } from "../../../__test__/fixtures/image";
import { patchPost } from "../post-controller";
import {
  updatePost,
  handleAttachmentPreview,
} from "../../../domain/use-cases/";
vi.mock("../../../domain/use-cases/");
describe("Controller for PATCH to /api/posts/:id endpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  let previewImage = makeFakeImageEntity();
  it("successfully updates a post when new PDF attachment is provided", async () => {
    const post = makeFakeRawPost({ file: "fakeFile" });
    handleAttachmentPreview.mockResolvedValue(previewImage);
    updatePost.mockResolvedValue(post);
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
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { updated: { ...post, imgCdn: previewImage.getCdn() } },
    };
    const actual = await patchPost(request);
    expect(actual).toEqual(expected);
  });
  it("successfully updates a post when new image attachment is provided", async () => {
    const post = makeFakeRawPost();
    const previewImage = makeFakeImageEntity();
    handleAttachmentPreview.mockResolvedValue(previewImage);
    updatePost.mockResolvedValue(post);
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
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { updated: { ...post, imgCdn: previewImage.getCdn() } },
    };
    const actual = await patchPost(request);
    expect(actual).toEqual(expected);
  });

  it("returns expected response error when exception is thrown", async () => {
    const error = {
      message: "Error thrown by PATCH /api/posts/:id controller",
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
    const actual = await patchPost(request);
    expect(actual).toEqual(expected);
  });
});
