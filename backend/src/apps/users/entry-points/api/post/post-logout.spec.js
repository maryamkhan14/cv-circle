import { describe, expect, beforeEach, afterEach, vi, test } from "vitest";
import makePostLogout from "./post-logout";

describe("Controller for POST to /logout endpoint", () => {
  let uncacheUser = vi.fn(() => {});
  let postLogout;
  beforeEach(() => {
    postLogout = makePostLogout({ uncacheUser });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Successfully logs out user", () => {
    const request = {
      sessionStore: {},
      logOut: () => {},
      session: { destroy: () => {} },
    };

    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
      statusCode: 200,
      body: {
        success: true,
        statusCode: 200,
        message: "Logout successful.",
      },
    };
    const actual = postLogout(request);
    expect(actual).toEqual(expected);
  });
  test("Returns error if no session found", () => {
    const request = {};
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: {
        error: "Logout unsuccessful: no session found.",
      },
    };
    const actual = postLogout(request);
    expect(actual).toEqual(expected);
  });
});
