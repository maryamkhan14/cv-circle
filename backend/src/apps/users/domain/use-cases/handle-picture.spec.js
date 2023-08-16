import { describe, expect, beforeEach, test, vi } from "vitest";
import { FAKE_USER_ID } from "../../__test__/fixtures/constants";
import { makeFakeImageEntity as makeFakeImage } from "../../__test__/fixtures/image";
import makeHandlePicture from "./handle-picture";

describe("Save profile picture use case", () => {
  let imagesDb;
  let makeImage;
  let handlePicture;
  let previewImage = makeFakeImage();

  beforeEach(() => {
    imagesDb = {
      insert: vi.fn(async () => {
        return await previewImage;
      }),
    };
    makeImage = vi.fn(() => {
      return previewImage;
    });
    handlePicture = makeHandlePicture({
      imagesDb,
      makeImage,
    });
  });

  test("Successfully saves profile pictures with no previous extension", async () => {
    let file = { type: "image/png", data: previewImage.getImageData() };
    let result = await handlePicture({ file, userId: FAKE_USER_ID });

    let makeImageArgs = makeImage.mock.calls[0][0];
    let imagesDbInsertArgs = imagesDb.insert.mock.calls[0][0];

    expect(makeImage).toHaveBeenCalledTimes(1);
    expect(imagesDb.insert).toHaveBeenCalledTimes(1);

    expect(makeImageArgs.imageData).toEqual(previewImage.getImageData());
    expect(makeImageArgs.userId).toEqual(FAKE_USER_ID);
    expect(imagesDbInsertArgs).toEqual({
      extension: previewImage.getExtension(),
      imageData: previewImage.getImageData(),
    });
    expect(result).toEqual(previewImage);
  });

  test("Throws error when database save fails", async () => {
    let file = { type: "application/pdf" };
    let error = { message: "Database save error" };
    imagesDb.insert.mockImplementation(async () => {
      return { error, data: null };
    });
    expect(handlePicture({ file, userId: FAKE_USER_ID })).rejects.toThrow(
      `Error uploading image preview to database: ${error.message}. Post creation failed.`
    );
  });
});
