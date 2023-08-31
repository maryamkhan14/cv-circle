export default function makePdfToImageConverter({ convert }) {
  // convert = fromBuffer
  return function pdfToImageConverter({ imageOptions, configuration }) {
    return Object.freeze({
      convert: async (file) =>
        await convert(file?.data, imageOptions)(...configuration),

      isBase64: () => options.base64,
    });
  };
}
