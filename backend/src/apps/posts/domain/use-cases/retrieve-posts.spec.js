import { describe, expect, vi, test, beforeEach } from "vitest";
import makeRetrievePosts from "./retrieve-posts";

describe("Retrieve posts use case", () => {
  let postsDb;
  let retrievePosts;
  beforeEach(() => {
    let getAll = vi.fn(async () => {
      return [];
    });
    postsDb = { ...postsDb, getAll };
    retrievePosts = makeRetrievePosts({ postsDb });
  });
  test("Successfully retrieves all posts", async () => {
    const expected = [];
    const actual = await retrievePosts();
    expect(actual).toEqual(expected);
    expect(postsDb.getAll).toBeCalledTimes(1);
  });
});
