import { fromBuffer } from "pdf2pic";
import makePdfToImageConverter from "./pdf-to-image-converter.js";
const pdfToImageConverter = makePdfToImageConverter({
  convert: fromBuffer,
});
const pdfToImage = pdfToImageConverter({
  imageOptions: {
    format: "png",
    width: 768,
    height: 1056,
    density: 600,
  },
  configuration: [
    1,
    {
      responseType: "buffer",
    },
  ],
});

export default Object.freeze({ pdfToImage });
export { pdfToImage };
