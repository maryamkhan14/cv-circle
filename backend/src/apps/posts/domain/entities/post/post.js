export default function buildMakePost() {
  return function makePost({
    id,
    createdAt,
    userId,
    title,
    postContent,
    imgCdn,
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
    if (!imgCdn) {
      throw new Error("Post must have image.");
    }
    return Object.freeze({
      getId: () => id,
      getCreatedAt: () => createdAt, // TODO: Add lastModified
      getUserId: () => userId,
      getTitle: () => title,
      getPostContent: () => postContent,
      getUpvoteCount: () => upvoteCount,
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
      getDTO: () => {
        return {
          id,
          createdAt,
          userId,
          title,
          postContent,
          imgCdn,
          upvoteCount,
        };
      },
    });
  };
}
