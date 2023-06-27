import { describe, expect, beforeEach, test, vi } from "vitest";
import { mockTestDbClient as dbClient } from "../__test__/fixtures/db-client.js";
import makeImagesDb from "./images-db.js";
import { makeFakeImageEntity as makeFakeImage } from "../__test__/fixtures/image.js";

describe("Images bucket tests", () => {
  let imagesDb;
  beforeEach(async () => {
    imagesDb = makeImagesDb({ dbClient });
  });
  test("Inserts an image", async () => {
    const image = makeFakeImage();
    const request = {
      extension: image.getExtension(),
      imageData: image.getImageData(),
    };
    await imagesDb.insert(request);
    const inserted = dbClient.uploadBucketSpy.mock.calls[0];
    expect(dbClient.uploadBucketSpy).toHaveBeenCalledTimes(1);
    expect(inserted[0]).toEqual(request.extension);
    expect(inserted[1]).toEqual(request.imageData);
  });
});
