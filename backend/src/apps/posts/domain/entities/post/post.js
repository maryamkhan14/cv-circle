export default function buildMakePost() {
  return function makePost({ userId, title, postContent, imgCdn } = {}) {
    if (!userId) {
      throw new Error("Post must have an author.");
    }
    if (!title) {
      throw new Error("Post must have a title.");
    }
    if (!postContent) {
      throw new Error("Post must have content.");
    }
    if (!imgCdn) {
      throw new Error("Post must have image.");
    }
    return Object.freeze({
      getUserId: () => userId,
      getTitle: () => title,
      getPostContent: () => postContent,
      getImage: () => imgCdn,
      setImage: (cdn) => {
        imgCdn = cdn;
      },
    });
  };
}
