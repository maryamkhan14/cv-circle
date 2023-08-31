import {
  FAKE_POST_ID,
  FAKE_POST_CREATED_AT,
  FAKE_IMAGE_CDN,
  FAKE_POST_CONTENT,
  FAKE_POST_TITLE,
  FAKE_USER_ID,
  FAKE_UPVOTE_COUNT,
  FAKE_POST_IS_REPLY,
  FAKE_POST_LEVEL,
  FAKE_POST_PATH,
} from "./constants";

// Make the object that will be passed into post entity factory function
export function makeFakeRawPost(overrides) {
  const post = {
    id: FAKE_POST_ID,
    createdAt: FAKE_POST_CREATED_AT,
    userId: FAKE_USER_ID,
    title: FAKE_POST_TITLE,
    postContent: FAKE_POST_CONTENT,
    imgCdn: FAKE_IMAGE_CDN,
    upvoteCount: FAKE_UPVOTE_COUNT,
    isReply: FAKE_POST_IS_REPLY,
    path: FAKE_POST_PATH,
    level: FAKE_POST_LEVEL,
    replies: {},
  };
  return { ...post, ...overrides };
}

// Make the object that will be returned by the post entity factory function -TODO: rename for clarity
export function makeFakePostEntity(overrides) {
  let {
    id,
    createdAt,
    userId,
    title,
    postContent,
    imgCdn,
    upvoteCount,
    isReply,
    path,
    level,
    replies,
  } = makeFakeRawPost(overrides);
  const post = {
    getId: () => id,
    getCreatedAt: () => createdAt, // TODO: Add lastModified
    getUserId: () => userId,
    getTitle: () => title,
    getPostContent: () => postContent,
    getUpvoteCount: () => upvoteCount || 0,
    getImage: () => imgCdn,
    getPath: () => path,
    setPath: (newPath) => {
      path = newPath;
    },
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
  };

  return post;
}
