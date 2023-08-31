import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { FAKE_USER_ID } from "../../__test__/fixtures/constants";
import { makeFakeImageEntity } from "../../__test__/fixtures/image";
import { imagesDb } from "../../data-access";
import { handleAttachmentPreview } from ".";
import makeImage from "../entities/image";
import makePdfPreview from "../services/pdf-preview/index.js";

vi.mock("../../data-access");
vi.mock("../entities/image");
vi.mock("../services/pdf-preview/index.js");

describe("Create attachment preview use case tests", () => {
  let previewImage = makeFakeImageEntity();
  beforeEach(() => {
    imagesDb.insert.mockReturnValue(previewImage);
    makePdfPreview.mockResolvedValue({
      get: () => previewImage.getImageData(),
    });
    makeImage.mockReturnValue(previewImage);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("successfully creates attachment preview for PDF files", async () => {
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

  it("successfully creates attachment preview for non-pdf files", async () => {
    let file = { type: "image/png", data: previewImage.getImageData() };
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

  it("throws error when database save fails", async () => {
    let file = { mimetype: "application/pdf" };
    let error = { message: "Database save error" };
    imagesDb.insert.mockResolvedValue({ error, data: null });
    expect(
      handleAttachmentPreview({ file, userId: FAKE_USER_ID })
    ).rejects.toThrow(
      `Error uploading image preview to database: ${error.message}. Post creation failed.`
    );
  });
});
