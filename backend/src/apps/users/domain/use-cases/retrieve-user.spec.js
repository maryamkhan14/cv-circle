import { vi, expect, describe, test, afterEach } from "vitest";
import { usersDb } from "../../data-access";
import { makeFakeRawUser } from "../../__test__/fixtures/user";
import { retrieveUser } from ".";
vi.mock("../../data-access");

describe("User retrieval tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const userToRetrieve = makeFakeRawUser();
  const { userId } = userToRetrieve;
  test("Removes user successfully", async () => {
    usersDb.getById.mockResolvedValue({ data: [userToRetrieve], error: null });
    const actual = await retrieveUser(userId);
    expect(actual).toEqual(userToRetrieve);
  });

  test("Throws error if user details are not found", async () => {
    usersDb.getById.mockResolvedValue({ data: null, error: null });
    expect(retrieveUser(userId)).rejects.toThrow("No such user exists.");
  });

  test("Throws error when database get operation fails", async () => {
    let error = { message: "Database operation error" };
    usersDb.getById.mockResolvedValue({ data: null, error });
    expect(retrieveUser(userId)).rejects.toThrow(
      `User could not be retrieved: ${error.message}`
    );
  });
});
