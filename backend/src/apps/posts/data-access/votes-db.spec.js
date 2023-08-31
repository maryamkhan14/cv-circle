import { describe, expect, afterEach, it, vi } from "vitest";
import { makeFakeRawVote } from "../__test__/fixtures/vote.js";
import { votesDb } from ".";
vi.mock("./db-client.js", async () => {
  const { mockTestDbClient } = await import(
    "../__test__/fixtures/db-client.js"
  );
  return { default: mockTestDbClient };
});
describe("Votes-relevant database tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("votes successfully", async () => {
    const voteDetails = makeFakeRawVote();
    const expected = { data: null, error: null };
    const actual = await votesDb.vote(voteDetails);
    expect(actual).toEqual(expected);
  });
});
