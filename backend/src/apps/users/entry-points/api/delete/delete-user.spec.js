import { describe, expect, beforeEach, afterEach, vi, test } from "vitest";
import { makeFakeRawUser, makeFakeUser } from "../../../__test__/fixtures/user";
import makeDeleteUser from "./delete-user";
vi.mock("../../../utils/with-error-handling.js", () => {
  return { default: vi.fn().mockReturnValue(() => null) };
});
describe("Controller for DELETE to /user endpoint", () => {
  let removeUser = vi.fn(async (userId) => makeFakeRawUser({ userId }));

  const userToDelete = makeFakeRawUser();
  let deleteUser;
  beforeEach(() => {
    deleteUser = makeDeleteUser({ removeUser });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Successfully deletes a user", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      user: userToDelete,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      },
      statusCode: 200,
      body: {
        deleted: { ...userToDelete },
      },
    };
    const actual = await deleteUser(request);
    expect(removeUser).toHaveBeenCalledTimes(1);
    const [removeUserArg] = removeUser.mock.calls[0];
    expect(removeUserArg).toEqual(userToDelete.userId);
    expect(actual).toEqual(expected);
  });
  test("Returns error response when error is thrown", async () => {
    let error = { message: "Error" };
    removeUser.mockImplementation(async () => {
      throw new Error(error.message);
    });
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      user: userToDelete,
    };
    const expected = {
      headers: { "Content-Type": "application/json" },
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await deleteUser(request);
    expect(actual).toEqual(expected);
  });
});
