import { it, describe, expect, vi, afterEach } from "vitest";
import {
  makeFakePostEntity,
  makeFakeRawPost,
} from "../../__test__/fixtures/post";
import { retrieveSinglePost } from ".";
import { postsDb } from "../../data-access";
vi.mock("../../data-access");

describe("Retrieve single post use case tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("retrieves a single post successfully", async () => {
    postsDb.getById.mockReturnValue({
      data: [makeFakeRawPost()],
      error: null,
    });
    let postId = 1;
    let expected = makeFakePostEntity().getDTO();
    let actual = await retrieveSinglePost(postId);
    expect(actual).toEqual(expected);
  });
  it("throws an error when post retrieval from DB fails", async () => {
    let postId = 1;
    let error = { message: "Post retrieval error message" };
    postsDb.getById.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(retrieveSinglePost(postId)).rejects.toThrow(
      `Error retrieving post: ${error.message}. Post retrieval failed.`
    );
  });
});
