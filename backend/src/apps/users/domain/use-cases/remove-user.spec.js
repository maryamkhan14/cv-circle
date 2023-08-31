import { vi, expect, describe, test, afterEach } from "vitest";
import { usersDb } from "../../data-access";
import { makeFakeRawUser } from "../../__test__/fixtures/user";
import { removeUser } from ".";
vi.mock("../../data-access");

describe("User deletion tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const userToRemove = makeFakeRawUser();
  const { userId } = userToRemove;
  test("Removes user successfully", async () => {
    usersDb.remove.mockResolvedValue({ data: [userToRemove], error: null });
    const actual = await removeUser(userId);
    expect(actual).toEqual(userToRemove);
  });

  test("Throws error if user details are not found", async () => {
    usersDb.remove.mockResolvedValue({ data: null, error: null });
    expect(removeUser(userId)).rejects.toThrow(
      "User details could not be retrieved."
    );
  });

  test("Throws error when database remove operation fails", async () => {
    let error = { message: "Database operation error" };
    usersDb.remove.mockResolvedValue({ data: null, error });
    expect(removeUser(userId)).rejects.toThrow(
      `User could not be removed: ${error.message}`
    );
  });
});
