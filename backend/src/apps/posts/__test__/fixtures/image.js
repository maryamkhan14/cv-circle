import {
  FAKE_USER_ID,
  FAKE_IMAGE_DATA,
  FAKE_IMAGE_EXTENSION,
} from "./constants.js";

// Make the object that will be passed into image entity factory function
function makeFakeRawImage(overrides) {
  const image = {
    userId: FAKE_USER_ID,
    imageData: () => FAKE_IMAGE_DATA,
  };
  return { ...image, ...overrides };
}

// Make the object that will be returned by the image entity factory function
function makeFakeImageEntity(overrides) {
  let extension = FAKE_IMAGE_EXTENSION;
  let cdn = process.env.VITE_SUPABASE_TEST_BASE_CDN_URL + FAKE_IMAGE_EXTENSION;
  const image = {
    getUserId: () =>
      overrides && overrides.hasOwnProperty("userId")
        ? overrides.userId
        : FAKE_USER_ID,
    getImageData: () =>
      overrides && overrides.hasOwnProperty("imageData")
        ? overrides.imageData
        : FAKE_IMAGE_DATA,
    getExtension: () =>
      overrides && overrides.hasOwnProperty("extension")
        ? overrides.extension
        : extension,
    getCdn: () =>
      overrides && overrides.hasOwnProperty("cdn") ? overrides.cdn : cdn,
    setExtension: (newExtension) => {
      extension = newExtension;
    },
    setCdn: (newCdn) => {
      cdn = newCdn;
    },
  };

  return image;
}
const fakeImage = Object.freeze({
  getImageData: () => FAKE_IMAGE_DATA,
  getExtension: () => FAKE_IMAGE_EXTENSION,
});
export { fakeImage, makeFakeImageEntity, makeFakeRawImage };
