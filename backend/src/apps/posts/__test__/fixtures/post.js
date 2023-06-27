import {
  FAKE_IMAGE_CDN,
  FAKE_POST_CONTENT,
  FAKE_POST_TITLE,
  FAKE_USER_ID,
} from "./constants";

// Make the object that will be passed into post entity factory function
export function makeFakeRawPost(overrides) {
  const post = {
    userId: FAKE_USER_ID,
    title: FAKE_POST_TITLE,
    postContent: FAKE_POST_CONTENT,
    imgCdn: FAKE_IMAGE_CDN,
  };
  return { ...post, ...overrides };
}

// Make the object that will be returned by the post entity factory function
export function makeFakePost(overrides) {
  let imgCdn =
    overrides && overrides.hasOwnProperty("imgCdn")
      ? overrides.imgCdn
      : FAKE_IMAGE_CDN;
  const post = {
    getUserId: () => {
      overrides && overrides.hasOwnProperty("userId")
        ? overrides.userId
        : FAKE_USER_ID;
    },
    getTitle: () =>
      overrides && overrides.hasOwnProperty("title")
        ? overrides.title
        : FAKE_POST_TITLE,
    getPostContent: () =>
      overrides && overrides.hasOwnProperty("postContent")
        ? overrides.postContent
        : FAKE_POST_CONTENT,
    getImage: () => imgCdn,
    setImage: (cdn) => {
      imgCdn = cdn;
    },
  };

  return post;
}
