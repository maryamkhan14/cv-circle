import cdnGenerator from "../../services/cdn-generator/index.js";
import { extensionGenerator } from "../../services/extension-generator/index.js";
import buildMakeImage from "./image.js";

const makeImage = buildMakeImage({ cdnGenerator, extensionGenerator }); // returns the *return value* of buildMakeImage, which is the inner makeImage function

export default makeImage;
