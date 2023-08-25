import { describe, test, expect, beforeEach, vi } from "vitest";
import { makeFakeUser } from "../../__test__/fixtures/user";
import makeCacheUser from "./cache-user";
import makeFakeSession from "../../__test__/fixtures/session";
describe("Updating cache with new records tests", () => {
  let sessionsCache;
  let cacheUser;
  beforeEach(() => {
    sessionsCache = {
      add: vi.fn(async (streamId, session) => {
        return Promise.resolve(session);
      }),
    };
    cacheUser = makeCacheUser({ sessionsCache });
  });

  test("Successfully adds session to stream", async () => {
    const streamId = "cache_auth";
    const session = makeFakeSession();
    cacheUser(session);
    expect(sessionsCache.add).toHaveBeenCalledTimes(1);
    const [streamIdArg, sessionArg] = sessionsCache.add.mock.calls[0];
    expect(streamIdArg).toEqual(streamId);
    expect(sessionArg).toEqual(session);
  });
});
