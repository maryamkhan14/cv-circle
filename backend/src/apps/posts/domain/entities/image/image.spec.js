import { describe, expect, it, vi } from "vitest";
import {
  makeFakeImageEntity as makeFakeImage,
  makeFakeRawImage,
} from "../../../__test__/fixtures/image";
import {
  FAKE_IMAGE_CDN,
  FAKE_IMAGE_DATA,
  FAKE_IMAGE_EXTENSION,
} from "../../../__test__/fixtures/constants";
import makeImage from ".";
vi.mock("../../services/cdn-generator", () => {
  return { default: () => FAKE_IMAGE_CDN };
});
vi.mock("../../services/extension-generator", () => {
  return { extensionGenerator: () => FAKE_IMAGE_EXTENSION };
});

describe("Image entity tests", () => {
  it("successfully generates image entity when no extension provided", () => {
    const image = makeFakeRawImage({ extension: null });
    const actual = makeImage(image);
    expect(actual.getExtension()).toEqual(FAKE_IMAGE_EXTENSION);
  });
  it("throws error if no image data", () => {
    const image = makeFakeRawImage({ imageData: null });
    expect(() => makeImage(image)).toThrow("Image must have image data.");
  });
  it("can get image data", () => {
    const image = makeFakeRawImage();
    const actual = makeImage(image);
    expect(actual.getImageData()).toEqual(FAKE_IMAGE_DATA);
  });
  it("can get image CDN", () => {
    const image = makeFakeRawImage();
    const actual = makeImage(image);
    expect(actual.getCdn()).toEqual(FAKE_IMAGE_CDN);
  });
  it("can set extension", () => {
    const image = makeFakeRawImage();
    const actual = makeImage(image);
    actual.setExtension("Arbitrary extension");
    expect(actual.getExtension()).toEqual("Arbitrary extension");
  });
  it("can set CDN", () => {
    const image = makeFakeRawImage();
    const actual = makeImage(image);
    actual.setCdn("Arbitrary CDN");
    expect(actual.getCdn()).toEqual("Arbitrary CDN");
  });
});
