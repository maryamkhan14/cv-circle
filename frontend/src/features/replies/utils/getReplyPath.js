export default function getPathDetails(data) {
  let { path } = data.posted || data.updated || data.deleted;
  let separator = path.indexOf(".");
  let originalPostId = path.substring(0, separator);
  let replyPath = renamePath(path, separator);
  console.log(originalPostId, replyPath);
  return { originalPostId, replyPath };
}
function renamePath(path, separator) {
  let remainingPath;
  remainingPath = path.substring(separator + 1);
  let renamedRemainingPath = `replies.${remainingPath.replace(
    /\./g,
    ".replies."
  )}`;
  return renamedRemainingPath;
}
