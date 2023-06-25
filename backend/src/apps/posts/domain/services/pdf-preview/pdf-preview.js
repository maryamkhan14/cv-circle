export default function buildMakePdfPreview({ fileConverter }) {
  return async function makePdfPreview(file) {
    if (!file) {
      throw new Error("File must be provided.");
    }
    let pdfArray = await fileConverter.convert(file.data);
    let pdfBuffer = makeBuffer(pdfArray);

    return Object.freeze({
      get: () => pdfBuffer, // default returns buffer
      getPreviewBuffer: () => pdfBuffer,
      getPreviewArray: () => pdfArray,
    });
  };

  //TODO:Consider moving to different file?
  function makeBuffer(pdfArray) {
    let pdfBuffer;
    if (fileConverter.isBase64() === true) {
      pdfBuffer = Buffer.from(...pdfArray, "base64");
    } else {
      pdfBuffer = Buffer.from(...pdfArray);
    }
    return pdfBuffer;
  }
}
