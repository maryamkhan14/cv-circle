export default function buildMakePost() {
  return function makePost({
    id,
    createdAt,
    userId,
    title,
    postContent,
    imgCdn,
    upvoteCount = 0,
    isReply,
    path,
    level,
    ...rest
  } = {}) {
    // No errors thrown for missing id, createdAt, because they are generated by the database.

    if (!userId) {
      throw new Error("Post must have an author.");
    }
    if (!title && !isReply) {
      throw new Error("Post must have a title.");
    }
    if (!postContent) {
      throw new Error("Post must have content.");
    }
    if (!imgCdn && !isReply) {
      throw new Error("Post must have image.");
    }
    let replies = {};
    if (rest?.replies) {
      replies = rest.replies;
    }
    return Object.freeze({
      getId: () => id,
      getCreatedAt: () => createdAt, // TODO: Add lastModified
      getUserId: () => userId,
      getTitle: () => title,
      getPostContent: () => postContent,
      getUpvoteCount: () => upvoteCount || 0,
      getImage: () => imgCdn,
      getPath: () => path,
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
      isReply: () => isReply,
      getDTO: () => {
        return {
          id,
          createdAt,
          userId,
          title,
          postContent,
          imgCdn,
          upvoteCount: upvoteCount || 0,
          replies,
          isReply,
          level,
          path,
        };
      },
    });
  };
}
