export default function buildMakePdfPreview({ fileConverter }) {
  return async function makePdfPreview(file) {
    if (!file) {
      throw new Error("File must be provided.");
    }
    let converted = await fileConverter.convert(file);
    return Object.freeze({
      get: () => converted.buffer, // default returns buffer
      getFileInformation: () => converted,
    });
  };
}
