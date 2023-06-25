const { faker } = require("@faker-js/faker");
const { createId } = require("@paralleldrive/cuid2");
const uniqueId = Object.freeze({
  makeId: createId, // TODO: Add isValidId()
});

const FAKE_USER_ID = 1;
const FAKE_IMAGE_EXTENSION = FAKE_USER_ID + "/" + uniqueId.makeId();
const FAKE_POST_TITLE = faker.lorem.sentence();
const FAKE_POST_CONTENT = faker.lorem.paragraph(3);
const FAKE_IMAGE_CDN =
  process.env.VITE_SUPABASE_TEST_BASE_CDN_URL + FAKE_IMAGE_EXTENSION;

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

export function makeFakeRawPost(overrides) {
  const post = {
    userId: FAKE_USER_ID,
    title: FAKE_POST_TITLE,
    postContent: FAKE_POST_CONTENT,
    imgCdn: FAKE_IMAGE_CDN,
  };
  return { ...post, ...overrides };
}
