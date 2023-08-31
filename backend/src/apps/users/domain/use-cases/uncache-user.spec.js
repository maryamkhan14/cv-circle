import { describe, test, expect, beforeEach, vi } from "vitest";
import makeUncacheUser from "./uncache-user";
import makeFakeSession from "../../__test__/fixtures/session";
describe("Cache invalidation tests", () => {
  let sessionsCache;
  let uncacheUser;
  beforeEach(() => {
    sessionsCache = {
      remove: vi.fn(async (streamId, sessionId) => {
        return Promise.resolve(sessionId);
      }),
    };
    uncacheUser = makeUncacheUser({ sessionsCache });
  });

  test("Successfully invalidates user in cache", async () => {
    const streamId = "cache_auth";
    const { sessionId } = makeFakeSession();
    uncacheUser(sessionId);
    expect(sessionsCache.remove).toHaveBeenCalledTimes(1);
    const [streamIdArg, sessionIdArg] = sessionsCache.remove.mock.calls[0];
    expect(streamIdArg).toEqual(streamId);
    expect(sessionIdArg).toEqual(sessionId);
  });
});
