export default function buildMakeImage({ cdnGenerator, extensionGenerator }) {
  return function makeImage({ imageData, userId, extension } = {}) {
    if (!imageData) {
      throw new Error("Image must have image data.");
    }
    if (!extension) {
      extension = extensionGenerator(userId);
    }
    let cdn = cdnGenerator(extension);
    return Object.freeze({
      getExtension: () => extension,
      getImageData: () => imageData,
      getCdn: () => cdn,
      setExtension: (newExtension) => {
        extension = newExtension;
      },
      setCdn: (newCdn) => (cdn = newCdn),
    });
  };
}
