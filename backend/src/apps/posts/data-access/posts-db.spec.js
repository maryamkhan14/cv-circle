import { describe, expect, beforeEach, test } from "vitest";
import { mockTestDbClient as dbClient } from "../__test__/fixtures/db-client.js";
import {
  makeFakeListOfRawPostRecords,
  makeFakeSingleRawPostRecord,
} from "../__test__/fixtures/mock-db-client-responses.js";
import makePostsDb from "./posts-db";
import { makeFakePostEntity, makeFakeRawPost } from "../__test__/fixtures/post";

describe("Posts-relevant database tests", () => {
  let postsDb;
  beforeEach(() => {
    postsDb = makePostsDb({ dbClient });
  });

  test("Inserts a post successfully", async () => {
    const toInsert = makeFakeRawPost({ id: null, createdAt: null });
    let result = await postsDb.insert(toInsert);

    const postsDbInsertArgs = dbClient.insertSpy.mock.calls[0][0];
    expect(dbClient.from).toHaveBeenCalledWith("posts");
    expect(dbClient.from).toHaveBeenCalledTimes(1);

    expect(dbClient.insertSpy).toHaveBeenCalledTimes(1);
    expect(postsDbInsertArgs.fk_uid).toEqual(toInsert.userId);
    expect(postsDbInsertArgs.title).toEqual(toInsert.title);
    expect(postsDbInsertArgs.post_content).toEqual(toInsert.postContent);
    expect(postsDbInsertArgs.img_cdn).toEqual(toInsert.imgCdn);
    expect(postsDbInsertArgs.upvote_count).toEqual(toInsert.upvoteCount);
  });

  test("Gets all posts successfully", async () => {
    let expected = makeFakeListOfRawPostRecords().map((postRecord) =>
      makeFakeRawPost({ id: postRecord.id })
    );
    let result = await postsDb.getAll();
    expect(dbClient.from).toHaveBeenCalledWith("posts");
    expect(result.data).toEqual(expected);
  });

  test("Gets a single post successfully", async () => {
    let postId = makeFakeSingleRawPostRecord()[0].id;
    let expected = [makeFakeRawPost({ id: postId })];
    let result = await postsDb.getById(postId);
    expect(result.data).toEqual(expected);
  });
});
