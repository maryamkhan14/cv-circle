import { describe, expect, beforeEach, test } from "vitest";
import { mockTestDbClient as dbClient } from "../__test__/fixtures/db-client.js";
import makePostsDb from "./posts-db";
import { makeFakeRawPost } from "../__test__/fixtures/post";

describe("Posts-relevant database tests", () => {
  let postsDb;
  beforeEach(() => {
    postsDb = makePostsDb({ dbClient });
  });
  test("Inserts a post successfully", async () => {
    const toInsert = makeFakeRawPost();

    let result = await postsDb.insert(toInsert);

    const postsDbInsertArgs = dbClient.insertSpy.mock.calls[0][0];
    expect(dbClient.from).toHaveBeenCalledWith("posts");
    expect(dbClient.from).toHaveBeenCalledTimes(1);
    expect(dbClient.insertSpy).toHaveBeenCalledTimes(1);
    expect(postsDbInsertArgs.fk_uid).toEqual(toInsert.userId);
    expect(postsDbInsertArgs.title).toEqual(toInsert.title);
    expect(postsDbInsertArgs.post_content).toEqual(toInsert.postContent);
    expect(postsDbInsertArgs.img_cdn).toEqual(toInsert.imgCdn);
    expect(result).toEqual(toInsert);
  });

  test("Gets all posts successfully", async () => {
    let expected = [{ ...makeFakeRawPost() }];
    let result = await postsDb.getAll();
    expect(dbClient.from).toHaveBeenCalledWith("posts");
    expect(result).toEqual(expected);
  });
});
