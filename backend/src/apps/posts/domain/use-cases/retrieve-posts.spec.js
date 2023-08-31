import { describe, expect, vi, it, afterEach } from "vitest";
import { retrievePosts } from ".";
import {
  makeFakeRawPost,
  makeFakePostEntity,
} from "../../__test__/fixtures/post.js";
import { postsDb } from "../../data-access";
vi.mock("../../data-access");
describe("Retrieve posts use case tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("successfully retrieves all posts", async () => {
    const expectedDbResponse = [{ ...makeFakeRawPost() }];
    postsDb.getAll.mockResolvedValue({
      data: expectedDbResponse,
      error: null,
    });
    const expectedRetrievalResponse = expectedDbResponse.map((post) =>
      makeFakePostEntity(post).getDTO()
    );
    const actual = await retrievePosts();
    expect(actual).toEqual(expectedRetrievalResponse);
    expect(postsDb.getAll).toBeCalledTimes(1);
  });

  it("throws error when database retrieval fails", async () => {
    let error = { message: "Posts retrieval error message" };
    postsDb.getAll.mockImplementation(async () => {
      return { data: null, error };
    });
    expect(retrievePosts()).rejects.toThrow(
      `Error retrieving posts: ${error.message}. Post retrieval failed.`
    );
  });
});
