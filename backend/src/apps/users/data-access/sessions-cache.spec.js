import { describe, test, beforeEach, afterEach, vi, expect } from "vitest";
import cacheClient from "../__test__/fixtures/cache.js";
import makeSessionsCache from "./sessions-cache.js";
import makeFakeSession from "../__test__/fixtures/session.js";
describe("Sessions cache", () => {
  let sessionsCache;
  beforeEach(() => {
    sessionsCache = makeSessionsCache({ cacheClient });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Successfully adds a session to the cache when its ID is not found in the hash", async () => {
    cacheClient.hExists.mockImplementation(async () => {
      return await 0;
    });
    const fakeSession = makeFakeSession();
    const expectedSession = { session: JSON.stringify(fakeSession) };
    const streamId = "cache_auth";

    let addedKey = await sessionsCache.add(streamId, fakeSession);
    const hExistsArgs = cacheClient.hExists.mock.calls[0];
    const xAddArgs = cacheClient.xAdd.mock.calls[0];
    const hSetArgs = cacheClient.hSet.mock.calls[0];
    expect(cacheClient.hExists).toHaveBeenCalledTimes(1);
    expect(cacheClient.xAdd).toHaveBeenCalledTimes(1);
    expect(cacheClient.hSet).toHaveBeenCalledTimes(1);
    expect(addedKey).toBeTruthy();
    expect(hExistsArgs[0]).toEqual("session_keys");
    expect(hExistsArgs[1]).toEqual(fakeSession.sessionId);
    expect(xAddArgs[0]).toEqual(streamId);
    expect(xAddArgs[1]).toEqual("*");
    expect(xAddArgs[2]).toEqual(expectedSession);
    expect(hSetArgs[0]).toEqual("session_keys");
    expect(hSetArgs[1]).toEqual(fakeSession.sessionId);
    expect(hSetArgs[2]).toEqual(addedKey);
  });
  test("Does not add a session to the cache when its ID is found in the hash", async () => {
    const fakeSession = makeFakeSession();
    const streamId = "cache_auth";
    let addedKey = await sessionsCache.add(streamId, fakeSession);
    const hExistsArgs = cacheClient.hExists.mock.calls[0];
    expect(cacheClient.hExists).toHaveBeenCalledTimes(1);
    expect(cacheClient.xAdd).toHaveBeenCalledTimes(0);
    expect(cacheClient.hSet).toHaveBeenCalledTimes(0);
    expect(hExistsArgs[0]).toEqual("session_keys");
    expect(hExistsArgs[1]).toEqual(fakeSession.sessionId);
    expect(addedKey).toBeUndefined();
  });
  test("Successfully invalidates user record", async () => {
    const fakeSession = makeFakeSession();
    const { sessionId } = fakeSession;
    const streamId = "cache_auth";
    const tombstone = { session: JSON.stringify({ sessionId }) };
    let keyDeletionStatus = await sessionsCache.remove(streamId, sessionId);

    expect(cacheClient.xAdd).toHaveBeenCalledTimes(1);
    expect(cacheClient.hDel).toHaveBeenCalledTimes(1);
    const xAddArgs = cacheClient.xAdd.mock.calls[0];
    const hDelArgs = cacheClient.hDel.mock.calls[0];

    expect(xAddArgs[0]).toEqual(streamId);
    expect(xAddArgs[1]).toEqual("*");
    expect(xAddArgs[2]).toEqual(tombstone);
    expect(hDelArgs[0]).toEqual("session_keys");
    expect(hDelArgs[1]).toEqual(sessionId);
    expect(keyDeletionStatus).toEqual(1);
  });
});
