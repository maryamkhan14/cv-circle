export default function buildExtensionGenerator({ uniqueId }) {
  return function generateExtension(posterId) {
    let extension = posterId + "/" + uniqueId.makeId();
    return extension;
  };
}
