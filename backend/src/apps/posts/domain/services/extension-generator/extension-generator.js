/* istanbul ignore file */
export default function buildExtensionGenerator({ uniqueId }) {
  return function generateExtension(posterId) {
    let extension = posterId + "/" + uniqueId.makeId() + ".png";
    return extension;
  };
}
