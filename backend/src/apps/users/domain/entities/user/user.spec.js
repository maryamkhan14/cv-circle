import { describe, test, expect } from "vitest";
import { makeFakeRawUser } from "../../../__test__/fixtures/user";
import makeUser from ".";
describe("User entity tests", () => {
  test("successfully creates a user", () => {
    const user = makeFakeRawUser();
    const createdUser = makeUser(user);
    expect(createdUser.getUserId()).toEqual(user.userId);
    expect(createdUser.getName()).toEqual(user.name);
    expect(createdUser.getEmail()).toEqual(user.email);
    expect(createdUser.getProfilePic()).toEqual(user.profilePic);
    expect(createdUser.getVoteHistory()).toEqual(user.voteHistory);
    expect(createdUser.getDisplayName()).toEqual(user.displayName);
    expect(createdUser.getLinkedin()).toEqual(user.linkedin);
    expect(createdUser.getTwitter()).toEqual(user.twitter);
    expect(createdUser.getBio()).toEqual(user.bio);
  });
  test("must have an ID", () => {
    const user = makeFakeRawUser({ userId: null });
    expect(() => makeUser(user)).toThrow("User must have an ID.");
  });
  test("must have a name", () => {
    const user = makeFakeRawUser({ name: null });
    expect(() => makeUser(user)).toThrow("User must have a name.");
  });
  test("must have an email", () => {
    const user = makeFakeRawUser({ email: null });
    expect(() => makeUser(user)).toThrow("User must have an email.");
  });
  test("must have a profile pic", () => {
    const user = makeFakeRawUser({ profilePic: null });
    expect(() => makeUser(user)).toThrow("User must have a profile picture.");
  });
});
