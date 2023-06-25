import { expect, describe, test } from "vitest";
import fakeProfile from "../../../__test__/fixtures/profile";
import isolateProfileDetails from ".";
describe("Isolate profile details tests", () => {
  test("successfully isolates profile details", () => {
    let expected = {
      userId: fakeProfile.id,
      name: fakeProfile.displayName,
      email: fakeProfile.emails[0].value,
      profilePic: fakeProfile.photos[0].value,
    };
    let actual = isolateProfileDetails(fakeProfile);
    expect(actual).toEqual(expected);
  });
});
