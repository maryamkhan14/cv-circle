import {
  FAKE_USER_ID,
  FAKE_POST_TITLE,
  FAKE_POST_CONTENT,
  FAKE_IMAGE_CDN,
} from "./fixtures/constants.js";

export function makeFakeSinglePostRecord(overrides) {
  const post = {
    fk_uid: FAKE_USER_ID,
    title: FAKE_POST_TITLE,
    post_content: FAKE_POST_CONTENT,
    img_cdn: FAKE_IMAGE_CDN,
  };
  return { ...post, ...overrides };
}
export function makeFakeListOfPostRecords(overrides) {
  const post = {
    fk_uid: FAKE_USER_ID,
    title: FAKE_POST_TITLE,
    post_content: FAKE_POST_CONTENT,
    img_cdn: FAKE_IMAGE_CDN,
  };
  return [{ ...post, ...overrides }];
}
