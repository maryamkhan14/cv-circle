import { describe, expect, test } from "vitest";
import { makeFakeImageEntity as makeFakeImage } from "../../../__test__/fixtures/image";
import makeImage from ".";

describe("Image entity", () => {
  test("must have image data", () => {
    const image = makeFakeImage({ imageData: null });
    expect(() => makeImage(image)).toThrow("Image must have image data.");
  });
  test("can set extension", () => {
    const image = makeFakeImage();
    image.setExtension("Arbitrary extension");
    expect(image.getExtension()).toEqual("Arbitrary extension");
  });
  test("can set CDN", () => {
    const image = makeFakeImage();
    image.setExtension("Arbitrary CDN");
    expect(image.getExtension()).toEqual("Arbitrary CDN");
  });
});
