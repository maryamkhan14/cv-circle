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

    let makeUserArgs = makeUser.mock.calls[0][0];
    expect(makeUserArgs).toEqual(fakeRawUser);

    let usersDbUpsertArgs = usersDb.upsert.mock.calls[0][0];
    expect(usersDbUpsertArgs.userId).toEqual(fakeRawUser.userId);
    expect(usersDbUpsertArgs.name).toEqual(fakeRawUser.name);
    expect(usersDbUpsertArgs.email).toEqual(fakeRawUser.email);
    expect(usersDbUpsertArgs.profilePic).toEqual(fakeRawUser.profilePic);
    expect(savedUser.getDTO()).toEqual(fakeRawUser);
  });
});
