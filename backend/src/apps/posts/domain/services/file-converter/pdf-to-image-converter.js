export default function makePdfToImageConverter({ convert }) {
  return function pdfToImageConverter(options) {
    return Object.freeze({
      convert: (file) => convert(file, options),
      isBase64: () => options.base64,
    });
  };
}
