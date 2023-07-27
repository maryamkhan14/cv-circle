export default function buildMakePost() {
  return function makePost({
    id,
    createdAt,
    userId,
    title,
    postContent,
    imgCdn,
    upvoters = [],
    downvoters = [],
    replies = [],
    parentId,
    upvoteCount = 0,
  } = {}) {
    // No errors thrown for missing id, createdAt, because they are generated by the database.
    if (!userId) {
      throw new Error("Post must have an author.");
    }
    if (!title) {
      throw new Error("Post must have a title.");
    }
    if (!postContent) {
      throw new Error("Post must have content.");
    }
    if (!imgCdn && !parentId) {
      throw new Error("Post must have image.");
    }
    return Object.freeze({
      getId: () => id,
      getCreatedAt: () => createdAt, // TODO: Add lastModified
      getUserId: () => userId,
      getTitle: () => title,
      getPostContent: () => postContent,
      getUpvoteCount: () => upvoteCount,
      getUpvoters: () => upvoters,
      getDownvoters: () => downvoters,
      setUpvoters: (upvoters) => {
        upvoters = upvoters;
      },
      setDownvoters: (downvoters) => {
        downvoters = downvoters;
      },
      getImage: () => imgCdn,
      setImage: (cdn) => {
        imgCdn = cdn;
      },
      setId: (newId) => {
        id = newId;
      },
      setCreatedAt: (newCreatedAt) => {
        createdAt = newCreatedAt;
      },
      getReplies: () => replies,
      getParentId: () => parentId,
      getDTO: () => {
        return {
          id,
          createdAt,
          userId,
          title,
          postContent,
          imgCdn,
          upvoteCount,
          upvoters,
          downvoters,
          parentId,
          replies,
        };
      },
    });
  };
}
