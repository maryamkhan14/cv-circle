import { describe, expect, beforeEach, afterEach, vi, test } from "vitest";
import { makeFakeRawUser, makeFakeUser } from "../../../__test__/fixtures/user";
import { makeFakeImageEntity as makeFakeImage } from "../../../__test__/fixtures/image";
import makePatchUser from "./patch-user";
import { FAKE_IMAGE_DATA } from "../../../__test__/fixtures/constants";
import { FAKE_IMAGE_EXTENSION } from "../../../__test__/fixtures/constants";

describe("Controller for PATCH to /user endpoint", () => {
  let previewImage = makeFakeImage();
  let handlePicture = vi.fn(async () => previewImage);
  let saveUser = vi.fn(async (user) => makeFakeUser({ ...user }));
  let user = makeFakeRawUser();
  let resultUser = makeFakeUser();
  const file = { imageData: FAKE_IMAGE_DATA };

  let patchUser;
  beforeEach(() => {
    patchUser = makePatchUser({ saveUser, handlePicture });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Successfully updates a user when no new profile picture is provided", async () => {
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
      body: {
        updated: { ...resultUser.getDTO() },
      },
    };
    const actual = await patchUser(request);
    expect(handlePicture).toHaveBeenCalledTimes(0);
    expect(saveUser).toHaveBeenCalledTimes(1);
    const saveUserArgs = saveUser.mock.calls[0];
    expect(saveUserArgs[0]).toEqual(user);
    expect(saveUserArgs[1]).toEqual(true);
    expect(actual).toEqual(expected);
  });
  test("Returns error response when error is thrown", async () => {
    let error = { message: "Error" };
    saveUser.mockImplementation(async () => {
      throw new Error(error.message);
    });
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    };
    const expected = {
      headers: { "Content-Type": "application/json" },
      statusCode: 400,
      body: { error: error.message },
    };
    const actual = await patchUser(request);
    expect(actual).toEqual(expected);
  });
  test("Successfully updates a user when a new profile picture is provided", async () => {
    let requestBody = { ...user, file };
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    };
    const processedBody = { ...requestBody, profilePic: previewImage.getCdn() };
    const { file: _, ...expectedBody } = processedBody;

    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: {
        updated: expectedBody,
      },
    };
    const actual = await patchUser(request);
    expect(handlePicture).toHaveBeenCalledTimes(1);
    expect(saveUser).toHaveBeenCalledTimes(1);
    const [handlePictureArg] = handlePicture.mock.calls[0];
    expect(handlePictureArg).toEqual(requestBody);
    const saveUserArgs = saveUser.mock.calls[0];

    expect(saveUserArgs[0]).toEqual(processedBody);
    expect(saveUserArgs[1]).toEqual(true);
    expect(actual).toEqual(expected);
  });
  test("Successfully updates a user when a new profile picture is provided and extension already exists", async () => {
    let existingCdn = `${process.env.DB_BASE_CDN_URL}${FAKE_IMAGE_EXTENSION}`;
    user = makeFakeRawUser({
      profilePic: existingCdn,
    });
    let requestBody = { ...user, file };
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    };
    const processedBody = { ...requestBody };
    const { file: _, ...expectedBody } = processedBody;

    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(request.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: {
        updated: expectedBody,
      },
    };
    const actual = await patchUser(request);
    expect(handlePicture).toHaveBeenCalledTimes(1);
    expect(saveUser).toHaveBeenCalledTimes(1);
    const [handlePictureArg] = handlePicture.mock.calls[0];
    expect(handlePictureArg).toEqual({
      ...requestBody,
      extension: FAKE_IMAGE_EXTENSION,
    });
    const saveUserArgs = saveUser.mock.calls[0];

    expect(saveUserArgs[0]).toEqual(processedBody);
    expect(saveUserArgs[1]).toEqual(true);
    expect(actual).toEqual(expected);
  });
});
