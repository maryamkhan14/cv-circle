import {
  FAKE_POST_ID,
  FAKE_POST_CREATED_AT,
  FAKE_IMAGE_CDN,
  FAKE_POST_CONTENT,
  FAKE_POST_TITLE,
  FAKE_USER_ID,
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
  };
  return { ...post, ...overrides };
}

// Make the object that will be returned by the post entity factory function -TODO: rename for clarity
export function makeFakePostEntity(overrides) {
  let id =
    overrides && overrides.hasOwnProperty("id") ? overrides.id : FAKE_POST_ID;
  let imgCdn =
    overrides && overrides.hasOwnProperty("imgCdn")
      ? overrides.imgCdn
      : FAKE_IMAGE_CDN;
  let userId =
    overrides && overrides.hasOwnProperty("userId")
      ? overrides.userId
      : FAKE_USER_ID;
  let title =
    overrides && overrides.hasOwnProperty("title")
      ? overrides.title
      : FAKE_POST_TITLE;
  let postContent =
    overrides && overrides.hasOwnProperty("postContent")
      ? overrides.postContent
      : FAKE_POST_CONTENT;
  let createdAt =
    overrides && overrides.hasOwnProperty("createdAt")
      ? overrides.createdAt
      : FAKE_POST_CREATED_AT;
  const post = {
    getId: () => id,
    getCreatedAt: () => createdAt,
    getUserId: () => userId,
    getTitle: () => title,
    getPostContent: () => postContent,
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
      return { id, createdAt, userId, title, postContent, imgCdn };
    },
  };

  return post;
}
