import { describe, expect, beforeEach, test, vi } from "vitest";
import { FAKE_USER_ID } from "../../__test__/fixtures/constants";
import { makeFakeImageEntity as makeFakeImage } from "../../__test__/fixtures/image";
import makeHandleAttachmentPreview from "./handle-attachment-preview";

describe("Create attachment preview use case", () => {
  let imagesDb;
  let makePdfPreview;
  let makeImage;
  let handleAttachmentPreview;
  let previewImage = makeFakeImage();

  beforeEach(() => {
    imagesDb = {
      insert: vi.fn(async () => {
        return Promise.resolve(previewImage);
      }),
    };
    makePdfPreview = vi.fn(() => {
      return { get: () => previewImage.getImageData() };
    });
    makeImage = vi.fn(() => {
      return previewImage;
    });
    handleAttachmentPreview = makeHandleAttachmentPreview({
      imagesDb,
      makePdfPreview,
      makeImage,
    });
  });

  test("Successfully creates attachment preview for PDF files", async () => {
    let file = { mimetype: "application/pdf" };
    let result = await handleAttachmentPreview({ file, userId: FAKE_USER_ID });
    let makePdfPreviewArgs = makePdfPreview.mock.calls[0][0];

    let makeImageArgs = makeImage.mock.calls[0][0];
    let imagesDbInsertArgs = imagesDb.insert.mock.calls[0][0];

    expect(makePdfPreview).toHaveBeenCalledTimes(1);
    expect(makeImage).toHaveBeenCalledTimes(1);
    expect(imagesDb.insert).toHaveBeenCalledTimes(1);

    expect(makePdfPreviewArgs).toEqual(file);
    expect(makeImageArgs.imageData).toEqual(previewImage.getImageData());
    expect(makeImageArgs.userId).toEqual(FAKE_USER_ID);
    expect(imagesDbInsertArgs).toEqual({
      extension: previewImage.getExtension(),
      imageData: previewImage.getImageData(),
    });
    expect(result).toEqual(previewImage);
  });

  test("Successfully creates attachment preview for non-pdf files", async () => {
    let file = { mimetype: "image/png", data: previewImage.getImageData() };
    let result = await handleAttachmentPreview({ file, userId: FAKE_USER_ID });

    let makeImageArgs = makeImage.mock.calls[0][0];
    let imagesDbInsertArgs = imagesDb.insert.mock.calls[0][0];

    expect(makePdfPreview).toHaveBeenCalledTimes(0);
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
    let file = { mimetype: "application/pdf" };
    imagesDb.insert.mockImplementation(async () => {
      return Promise.resolve({ error: { message: "Big test error" } });
    });
    expect(
      handleAttachmentPreview({ file, userId: FAKE_USER_ID })
    ).rejects.toThrow(
      "Error uploading image preview to database: Big test error. Post creation failed."
    );
  });
});
