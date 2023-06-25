import { convert } from "pdf-img-convert"; //TODO:Proper import
import makePdfToImageConverter from "./pdf-to-image-converter.js";
const pdfToImageConverter = makePdfToImageConverter({ convert });
const pdfToImage = pdfToImageConverter({
  page_numbers: [1],
  base64: true,
});

export default Object.freeze({ pdfToImage });
export { pdfToImage };
