import { test, describe, expect, vi, beforeEach } from "vitest";
import { makeFakePostEntity } from "../../__test__/fixtures/post";
import { makeFakeSingleRawPostRecord } from "../../__test__/fixtures/mock-db-client-responses";
import makeRetrieveSinglePost from "./retrieve-single-post";

describe("Retrieve single post use case", () => {
  let postsDb;
  let retrieveSinglePost;
  let postRecord = makeFakeSingleRawPostRecord();
  beforeEach(() => {
    let getById = vi.fn(async () => {
      return {
        data: postRecord.map(
          ({
            id,
            created_at: createdAt,
            fk_uid: userId,
            title,
            post_content: postContent,
            img_cdn: imgCdn,
            upvote_count: upvoteCount,
          }) => {
            return {
              id,
              createdAt,
              userId,
              title,
              postContent,
              imgCdn,
              upvoteCount,
            };
          }
        ),
        error: null,
      };
    });
    postsDb = { getById };
    retrieveSinglePost = makeRetrieveSinglePost({ postsDb });
  });
  test("Retrieves a single post successfully", async () => {
    let postId = 1;
    let expected = makeFakePostEntity(...postRecord).getDTO();
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
