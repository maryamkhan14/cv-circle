import { describe, expect, vi, test, beforeEach } from "vitest";
import makeRetrievePosts from "./retrieve-posts";
import {
  makeFakeRawPost,
  makeFakePostEntity,
} from "../../__test__/fixtures/post.js";

describe("Retrieve posts use case", () => {
  let postsDb;
  let retrievePosts;
  beforeEach(() => {
    let getAll = vi.fn(async () => {
      return { data: [{ ...makeFakeRawPost() }], error: null };
    });
    postsDb = { getAll };
    retrievePosts = makeRetrievePosts({ postsDb });
  });
  test("Successfully retrieves all posts", async () => {
    const expectedDbResponse = [{ ...makeFakeRawPost() }];
    const expectedRetrievalResponse = expectedDbResponse.map((post) =>
      makeFakePostEntity(post).getDTO()
    );

    const actual = await retrievePosts();
    expect(actual).toEqual(expectedRetrievalResponse);
    expect(postsDb.getAll).toBeCalledTimes(1);
  });

  test("Throws error when database retrieval fails", async () => {
    let error = { message: "Posts retrieval error message" };
    postsDb.getAll.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(retrievePosts()).rejects.toThrow(
      `Error retrieving posts: ${error.message}. Post retrieval failed.`
    );
  });
});
