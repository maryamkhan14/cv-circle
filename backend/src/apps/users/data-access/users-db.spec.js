import { describe, test, beforeEach, afterEach, vi, expect } from "vitest";
import { mockTestDbClient as dbClient } from "../__test__/fixtures/db.js";
import makeUsersDb from "./users-db.js";
import { makeFakeRawUser } from "../__test__/fixtures/user";

describe("Users database tests", () => {
  let usersDb;
  beforeEach(() => {
    usersDb = makeUsersDb({ dbClient });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("successfully upserts a user", async () => {
    const toInsert = makeFakeRawUser();
    await usersDb.upsert(toInsert);
    const upserted = dbClient.upsertSpy.mock.calls[0][0];
    expect(dbClient.upsertSpy).toHaveBeenCalledTimes(1);
    expect(upserted.uid).toEqual(toInsert.userId);
    expect(upserted.name).toEqual(toInsert.name);
    expect(upserted.email).toEqual(toInsert.email);
    expect(upserted.profile_pic).toEqual(toInsert.profilePic);
  });
  test("successfully updates a user", async () => {
    const toUpdate = makeFakeRawUser();
    await usersDb.update(toUpdate);
    const updated = dbClient.updateSpy.mock.calls[0][0];
    expect(dbClient.updateSpy).toHaveBeenCalledTimes(1);
    expect(updated.email).toEqual(toUpdate.email);
    expect(updated.avatar).toEqual(toUpdate.profilePic);
    expect(updated.display_name).toEqual(toUpdate.displayName);
    expect(updated.linkedin).toEqual(toUpdate.linkedin);
    expect(updated.twitter).toEqual(toUpdate.twitter);
    expect(updated.bio).toEqual(toUpdate.bio);
  });
  test("successfully removes a user", async () => {
    const toDelete = makeFakeRawUser();
    const { userId } = toDelete;
    const expected = { data: [toDelete], error: null };
    const actual = await usersDb.remove(userId);
    expect(actual).toEqual(expected);
  });
});
