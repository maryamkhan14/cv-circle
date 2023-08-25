import { describe, test, expect, beforeEach, vi } from "vitest";
import { makeFakeUser } from "../../__test__/fixtures/user";
import makeSaveUser from "./save-user";

describe("Authenticate user use case tests", () => {
  let usersDb;
  let makeUser;
  let saveUser;
  let isolateProfileDetails;
  let fakeRawUser = makeFakeUser().getDTO();
  let fakeUserEntity = makeFakeUser();
  beforeEach(() => {
    usersDb = {
      upsert: vi.fn(async (user) => {
        return Promise.resolve({ data: [user], error: null });
      }),
      update: vi.fn(async (user) => {
        return Promise.resolve({ data: [user], error: null });
      }),
    };
    isolateProfileDetails = vi.fn(() => fakeRawUser);
    makeUser = vi.fn(() => fakeUserEntity);
    saveUser = makeSaveUser({
      usersDb,
      makeUser,
      isolateProfileDetails,
    });
  });

  test("Successfully saves user", async () => {
    let savedUser = await saveUser(fakeRawUser);
    expect(makeUser).toHaveBeenCalledTimes(2);
    expect(usersDb.upsert).toHaveBeenCalledTimes(1);
    expect(usersDb.update).toHaveBeenCalledTimes(0);

    let makeUserArgs = makeUser.mock.calls[0][0];
    expect(makeUserArgs).toEqual(fakeRawUser);

    let usersDbUpsertArgs = usersDb.upsert.mock.calls[0][0];
    expect(usersDbUpsertArgs.userId).toEqual(fakeRawUser.userId);
    expect(usersDbUpsertArgs.name).toEqual(fakeRawUser.name);
    expect(usersDbUpsertArgs.email).toEqual(fakeRawUser.email);
    expect(usersDbUpsertArgs.profilePic).toEqual(fakeRawUser.profilePic);
    expect(savedUser.getDTO()).toEqual(fakeRawUser);
  });

  test("Throws error if user details are not found", async () => {
    usersDb.upsert.mockImplementation(async () => {
      return await { data: null, error: null };
    });
    expect(saveUser(fakeRawUser)).rejects.toThrow(
      "User details could not be retrieved"
    );
  });

  test("Throws error when database operation fails", async () => {
    let error = { message: "Database operation error" };
    usersDb.upsert.mockImplementation(async () => {
      return await { data: null, error };
    });
    expect(saveUser(fakeRawUser)).rejects.toThrow(
      `User could not be saved: ${error.message}`
    );
  });

  test("Calls usersDb update function when onlyUpdate is set to true", async () => {
    let updatedUser = await saveUser(fakeRawUser, true);
    expect(makeUser).toHaveBeenCalledTimes(2);
    expect(usersDb.update).toHaveBeenCalledTimes(1);
    expect(usersDb.upsert).toHaveBeenCalledTimes(0);

    let makeUserArgs = makeUser.mock.calls[0][0];
    expect(makeUserArgs).toEqual(fakeRawUser);

    let usersDbUpdateArgs = usersDb.update.mock.calls[0][0];
    expect(usersDbUpdateArgs.userId).toEqual(fakeRawUser.userId);
    expect(usersDbUpdateArgs.name).toEqual(fakeRawUser.name);
    expect(usersDbUpdateArgs.email).toEqual(fakeRawUser.email);
    expect(usersDbUpdateArgs.profilePic).toEqual(fakeRawUser.profilePic);
    expect(updatedUser.getDTO()).toEqual(fakeRawUser);
  });
});
