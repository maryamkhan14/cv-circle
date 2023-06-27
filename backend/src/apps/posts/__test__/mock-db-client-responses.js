import { makeFakeRawPost } from "./fixtures/post.js";

let { userId, title, postContent, imgCdn } = makeFakeRawPost();
export function makeFakeSinglePostRecord(overrides) {
  let post = {
    fk_uid: userId,
    title: title,
    post_content: postContent,
    img_cdn: imgCdn,
  };
  return { ...post, ...overrides };
}
export function makeFakeListOfPostRecords(overrides) {
  let post = {
    fk_uid: userId,
    title: title,
    post_content: postContent,
    img_cdn: imgCdn,
  };
  return [{ ...post, ...overrides }];
}
