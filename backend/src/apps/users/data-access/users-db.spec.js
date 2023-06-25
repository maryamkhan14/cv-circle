import { describe, test, beforeEach, expect } from "vitest";
import { mockTestDbClient as dbClient } from "../__test__/fixtures/db.js";
import makeUsersDb from "./users-db.js";
import { makeFakeRawUser } from "../__test__/fixtures/user";

describe("Users database tests", () => {
  let usersDb;
  beforeEach(() => {
    usersDb = makeUsersDb({ dbClient });
  });
  test("successfully upserts a user", async () => {
    const toInsert = makeFakeRawUser();
    await usersDb.upsert(toInsert);
    const upserted = dbClient.upsertSpy.mock.calls[0][0];
    expect(dbClient.upsertSpy).toHaveBeenCalledTimes(1);
    expect(upserted.uid).toEqual(toInsert.userId);
    expect(upserted.name).toEqual(toInsert.name);
    expect(upserted.email).toEqual(toInsert.email);
    expect(upserted.profilepic).toEqual(toInsert.profilePic);
  });
});
