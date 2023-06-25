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
        Promise.resolve(user);
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

  test("Successfully upsert user to database", () => {
    saveUser(fakeRawUser);
    expect(makeUser).toHaveBeenCalledTimes(1);
    expect(usersDb.upsert).toHaveBeenCalledTimes(1);

    let makeUserArgs = makeUser.mock.calls[0][0];
    expect(makeUserArgs).toEqual(fakeRawUser);

    let usersDbUpsertArgs = usersDb.upsert.mock.calls[0][0];
    expect(usersDbUpsertArgs).toEqual(fakeRawUser);
  });
});
