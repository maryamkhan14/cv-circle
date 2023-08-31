import { describe, expect, afterEach, it, vi } from "vitest";
import cacheStore from "./cache-store";
import { sessionsCache } from ".";
vi.mock("./cache-store", () => {
  return {
    default: {
      set: vi.fn(),
      destroy: vi.fn(),
      client: {
        get: vi.fn(),
      },
    },
  };
});

describe("Sessions cache tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("gets session by session ID", async () => {
    const sessionId = 1;
    await sessionsCache.get(sessionId);
    const [getArg] = cacheStore.client.get.mock.calls[0];
    expect(getArg).toEqual(1);
  });

  it("sets session details by session ID if sessionDetails exists", async () => {
    const sessionId = 1;
    const sessionDetails = { information: true };
    await sessionsCache.set(sessionId, sessionDetails);
    const [setIdArg, setDetailsArg] = cacheStore.set.mock.calls[0];
    expect(cacheStore.set).toHaveBeenCalledTimes(1);
    expect(cacheStore.destroy).toHaveBeenCalledTimes(0);
    expect(setIdArg).toEqual(sessionId);
    expect(setDetailsArg).toEqual(sessionDetails);
  });

  it("destroys session record if sessionDetails is null", async () => {
    const sessionId = 1;
    const sessionDetails = null;
    await sessionsCache.set(sessionId, sessionDetails);
    const [destroyArg] = cacheStore.destroy.mock.calls[0];
    expect(cacheStore.set).toHaveBeenCalledTimes(0);
    expect(cacheStore.destroy).toHaveBeenCalledTimes(1);
    expect(destroyArg).toEqual(sessionId);
  });
});
