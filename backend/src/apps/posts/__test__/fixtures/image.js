import {
  FAKE_USER_ID,
  FAKE_IMAGE_DATA,
  FAKE_IMAGE_EXTENSION,
} from "./constants.js";

// Make the object that will be passed into image entity factory function
function makeFakeRawImage(overrides) {
  const image = {
    userId: FAKE_USER_ID,
    imageData: FAKE_IMAGE_DATA,
  };
  return { ...image, ...overrides };
}

// Make the object that will be returned by the image entity factory function
function makeFakeImageEntity(overrides) {
  let { imageData } = makeFakeRawImage(overrides);
  let extension = FAKE_IMAGE_EXTENSION;
  let cdn = process.env.DB_TEST_BASE_CDN_URL + FAKE_IMAGE_EXTENSION;
  const image = {
    getExtension: () => extension,
    getImageData: () => imageData,
    getCdn: () => cdn,
    setExtension: (newExtension) => {
      extension = newExtension;
    },
    setCdn: (newCdn) => (cdn = newCdn),
  };

  return image;
}
export { makeFakeImageEntity, makeFakeRawImage };
