import { describe, expect, beforeEach, test } from "vitest";
import { mockTestDbClient as dbClient } from "../__test__/fixtures/db.js";
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

    const inserted = dbClient.insertSpy.mock.calls[0][0];
    expect(dbClient.from).toHaveBeenCalledWith("posts");
    expect(dbClient.from).toHaveBeenCalledTimes(1);
    expect(dbClient.insertSpy).toHaveBeenCalledTimes(1);
    expect(inserted.fk_uid).toEqual(toInsert.userId);
    expect(inserted.title).toEqual(toInsert.title);
    expect(inserted.post_content).toEqual(toInsert.postContent);
    expect(inserted.img_cdn).toEqual(toInsert.imgCdn);
    expect(result).toEqual(inserted);
  });

  test("Gets all posts successfully", async () => {
    await postsDb.getAll();
    expect(dbClient.from).toHaveBeenCalledWith("posts");
  });
});
