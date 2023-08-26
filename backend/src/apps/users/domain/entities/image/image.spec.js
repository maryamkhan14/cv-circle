import { describe, expect, test, vi } from "vitest";
import {
  makeFakeImageEntity as makeFakeImage,
  makeFakeRawImage,
} from "../../../__test__/fixtures/image";
import buildMakeImage from "./image";

describe("Image entity", () => {
  const cdnGenerator = vi.fn(() => "Arbitrary CDN");
  const extensionGenerator = vi.fn(() => "Arbitrary extension");

  const makeImage = buildMakeImage({ cdnGenerator, extensionGenerator });
  test("successfully generates image entity when no extension provided", () => {
    const image = makeFakeRawImage({ extension: null });
    const actual = makeImage(image);
    expect(extensionGenerator).toHaveBeenCalledTimes(1);
    expect(actual.getExtension()).toEqual("Arbitrary extension");
  });
  test("must have image data", () => {
    const image = makeFakeRawImage({ imageData: null });
    expect(() => makeImage(image)).toThrow("Image must have image data.");
  });
  test("can set extension", () => {
    const image = makeImage(makeFakeRawImage());
    image.setExtension("Arbitrary extension");
    expect(image.getExtension()).toEqual("Arbitrary extension");
  });
  test("can set CDN", () => {
    const image = makeImage(makeFakeRawImage());
    image.setCdn("Arbitrary CDN");
    expect(image.getCdn()).toEqual("Arbitrary CDN");
  });
});
