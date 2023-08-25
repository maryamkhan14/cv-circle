import { describe, expect, beforeEach, afterEach, vi, test } from "vitest";
import makeFakeSession from "../../../__test__/fixtures/session";
import { makeFakeRawUser } from "../../../__test__/fixtures/user";
import makeGetAuthSuccess from "./get-auth-success";

describe("Controller for POST to /logout endpoint", () => {
  let cacheUser = vi.fn(() => {});
  let getAuthSuccess;
  beforeEach(() => {
    getAuthSuccess = makeGetAuthSuccess({ cacheUser });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Returns success response if user found", () => {
    const user = makeFakeRawUser();
    const session = makeFakeSession();
    const request = {
      user,
      sessionId: session.sessionId,
      session,
    };

    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: {
        success: true,
        statusCode: 200,
        message: "Login successful",
        user,
      },
    };
    const actual = getAuthSuccess(request);
    expect(actual).toEqual(expected);
  });
  test("Returns error if no user found", () => {
    const request = {};
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: {
        error: "Login unsuccessful: no user found.",
      },
    };
    const actual = getAuthSuccess(request);
    expect(actual).toEqual(expected);
  });
});
