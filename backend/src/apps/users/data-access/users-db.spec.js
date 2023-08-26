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
    const toInsert = makeFakeRawUser();
    await usersDb.update(toInsert);
    const updated = dbClient.updateSpy.mock.calls[0][0];
    expect(dbClient.updateSpy).toHaveBeenCalledTimes(1);
    expect(updated.email).toEqual(toInsert.email);
    expect(updated.avatar).toEqual(toInsert.profilePic);
    expect(updated.display_name).toEqual(toInsert.displayName);
    expect(updated.linkedin).toEqual(toInsert.linkedin);
    expect(updated.twitter).toEqual(toInsert.twitter);
    expect(updated.bio).toEqual(toInsert.bio);
  });
});
