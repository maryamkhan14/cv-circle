import uniqueId from "../unique-id/index.js";
import buildExtensionGenerator from "./extension-generator.js";
const extensionGenerator = buildExtensionGenerator({ uniqueId });
const extensionService = Object.freeze({ extensionGenerator });
export default extensionService;
export { extensionGenerator };
