import { test, describe, expect, vi, beforeEach } from "vitest";
import {
  makeFakeRawPost,
  makeFakePostEntity,
} from "../../__test__/fixtures/post";
import makeRetrieveSinglePost from "./retrieve-single-post";
describe("Retrieve single post use case", () => {
  let postsDb;
  let retrieveSinglePost;
  let postRecord = makeFakeRawPost();
  beforeEach(() => {
    let getById = vi.fn(async () => {
      return { data: postRecord, error: null };
    });
    postsDb = { getById };
    retrieveSinglePost = makeRetrieveSinglePost({ postsDb });
  });
  test("Retrieves a single post successfully", async () => {
    let postId = 1;
    let expected = makeFakePostEntity(postRecord).getDTO();
    let actual = await retrieveSinglePost(postId);
    expect(actual).toEqual(expected);
  });
  test("Throws an error when post retrieval from DB fails", async () => {
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
