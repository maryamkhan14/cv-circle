import { describe, expect, test, vi } from "vitest";
import {
  makeFakeImageEntity as makeFakeImage,
  makeFakeRawImage,
} from "../../../__test__/fixtures/image";
import buildMakeImage from "./image";
import makeImage from ".";

describe("Image entity", () => {
  test("successfully generates image entity when no extension provided", () => {
    const image = makeFakeRawImage({ extension: null });
    const cdnGenerator = vi.fn(() => "Arbitrary CDN");
    const extensionGenerator = vi.fn(() => "Arbitrary extension");
    makeImage = buildMakeImage({ cdnGenerator, extensionGenerator });
    const actual = makeImage(image);
    expect(actual.getExtension()).toEqual("Arbitrary extension");
  });
  test("must have image data", () => {
    const image = makeFakeRawImage({ imageData: null });
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
