import { describe, expect, afterEach, it, vi } from "vitest";
import dbClient from "./db-client.js";
import {
  makeFakeListOfRawPostRecords,
  makeFakeSingleRawPostRecord,
} from "../__test__/fixtures/mock-db-client-responses.js";
import { postsDb } from ".";
import { makeFakePostEntity, makeFakeRawPost } from "../__test__/fixtures/post";
vi.mock("./db-client.js", async () => {
  const { mockTestDbClient } = await import(
    "../__test__/fixtures/db-client.js"
  );
  return { default: mockTestDbClient };
});
describe("Posts-relevant database tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("inserts a post successfully", async () => {
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
  });

  it("gets all posts successfully", async () => {
    let expected = makeFakeListOfRawPostRecords().map((postRecord) =>
      makeFakeRawPost({ id: postRecord.id })
    );
    let result = await postsDb.getAll();
    expect(dbClient.from).toHaveBeenCalledWith("posts_view");
    expect(result.data).toEqual(expected);
  });

  it("gets a single nested post successfully", async () => {
    let postId = makeFakeSingleRawPostRecord()[0].id;
    let expected = [makeFakeRawPost({ id: postId })];
    let result = await postsDb.getById(postId);
    expect(result.data.id).toEqual(expected.id);
    expect(result.data.fk_uid).toEqual(expected.userId);
    expect(result.data.created_at).toEqual(expected.createdAt);
    expect(result.data.title).toEqual(expected.title);
    expect(result.data.postContent).toEqual(expected.postContent);
    expect(result.data.imgCdn).toEqual(expected.imgCdn);
    expect(result.data.isReply).toEqual(expected.isReply);
    expect(result.data.path).toEqual(expected.path);
    expect(result.data.level).toEqual(expected.level);
    expect(result.data.replies).toEqual(expected.replies);
  });

  it("gets a single un-nested post successfully", async () => {
    let postId = makeFakeSingleRawPostRecord()[0].id;
    let expected = [makeFakeRawPost({ id: postId })];
    let result = await postsDb.getById(postId, false);
    expect(result.data.id).toEqual(expected.id);
    expect(result.data.fk_uid).toEqual(expected.userId);
    expect(result.data.created_at).toEqual(expected.createdAt);
    expect(result.data.title).toEqual(expected.title);
    expect(result.data.postContent).toEqual(expected.postContent);
    expect(result.data.imgCdn).toEqual(expected.imgCdn);
    expect(result.data.isReply).toEqual(expected.isReply);
    expect(result.data.path).toEqual(expected.path);
    expect(result.data.level).toEqual(expected.level);
    expect(result.data.replies).toEqual(expected.replies);
  });

  it("updates a post successfully", async () => {
    let post = makeFakeRawPost();
    let expected = { data: null, error: null };
    let actual = await postsDb.update({ ...post });
    expect(actual).toEqual(expected);
  });

  it("removes a post successfully", async () => {
    let post = makeFakeRawPost();
    let expected = { data: [post], error: null };
    let actual = await postsDb.remove({ ...post });
    expect(actual).toEqual(expected);
  });
});
