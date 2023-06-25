import { pdfToImage as fileConverter } from "../file-converter/index.js";
import buildMakePdfPreview from "./pdf-preview.js";

const makePdfPreview = buildMakePdfPreview({ fileConverter });

export default makePdfPreview;
