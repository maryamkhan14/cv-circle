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
    });
  });

  test("Successfully saves profile pictures with no previous extension", async () => {
    let file = { type: "image/png", data: previewImage.getImageData() };
    let result = await handlePicture({ file, userId: FAKE_USER_ID });

    let imagesDbInsertArgs = imagesDb.insert.mock.calls[0][0];

    expect(imagesDb.insert).toHaveBeenCalledTimes(1);

    expect(imagesDbInsertArgs.imageData).toEqual(previewImage.getImageData());
    expect(result.getImageData()).toEqual(previewImage.getImageData());
    expect(result.getExtension()).toContain(FAKE_USER_ID);
  });

  test("Throws error when database save fails", async () => {
    let file = { type: "application/pdf", data: previewImage.getImageData() };
    let error = { message: "Database save error" };
    imagesDb.insert.mockImplementation(async () => {
      return { error, data: null };
    });
    expect(handlePicture({ file, userId: FAKE_USER_ID })).rejects.toThrow(
      `Error uploading image preview to database: ${error.message}. Post creation failed.`
    );
  });
});
