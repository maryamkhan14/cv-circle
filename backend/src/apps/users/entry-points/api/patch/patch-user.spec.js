import { describe, expect, beforeEach, vi, test } from "vitest";
import { makeFakeRawUser } from "../../../__test__/fixtures/user";
import { makeFakeImageEntity as makeFakeImage } from "../../../__test__/fixtures/image";
import makePatchUser from "./patch-user";

describe("Controller for PATCH to /user endpoint", () => {
  let previewImage = makeFakeImage();
  let handleAttachment = vi.fn(async () => previewImage);
  let updateUser = vi.fn(async (user) => user);
  let patchUser;
  beforeEach(() => {
    patchUser = makePatchUser({ updateUser, handleAttachment });
  });

  test("Successfully updates a user", async () => {
    const user = makeFakeRawUser();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { updated: { ...user, profilePic: previewImage.getCdn() } },
    };
    const actual = await patchUser(request);
    expect(actual).toEqual(expected);
  });
});
