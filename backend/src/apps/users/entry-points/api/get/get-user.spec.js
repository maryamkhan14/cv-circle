import { describe, expect, beforeEach, afterEach, vi, test } from "vitest";
import makeFakeSession from "../../../__test__/fixtures/session";
import { makeFakeRawUser } from "../../../__test__/fixtures/user";
import makeGetUser from "./get-user";

describe("Controller for GET to /user endpoint", () => {
  let retrieveUser = vi.fn(() => makeFakeRawUser());
  let getUser;
  beforeEach(() => {
    getUser = makeGetUser({ retrieveUser });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  const user = makeFakeRawUser();
  const { userId } = user;
  let request = {
    params: { userId },
  };
  test("Returns success response if user found", async () => {
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: {
        user,
      },
    };
    const actual = await getUser(request);
    expect(actual).toEqual(expected);
  });
  test("Returns expected response error when exception is thrown", async () => {
    const error = {
      message: "Error thrown by GET /:id controller",
    };
    retrieveUser.mockImplementation(async () => {
      throw new Error(error.message);
    });
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: error,
    };
    const actual = await getUser(request);
    expect(actual).toEqual(expected);
  });
  test("Uses userId in session user object, if no userId passed via params", async () => {
    request = { user };
    await getUser(request);
    const [userIdArg] = retrieveUser.mock.calls;
    expect(userIdArg).toEqual(user.userId);
  });
  test("Throws error if no user ID is found in session user object and params", async () => {
    request = { user };
    await getUser(request);
    const [userIdArg] = retrieveUser.mock.calls;
    expect(userIdArg).toEqual(user.userId);
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: "Error retrieving user: no user ID provided." },
    };
    const actual = await getUser(request);
    expect(actual).toEqual(expected);
  });
});
