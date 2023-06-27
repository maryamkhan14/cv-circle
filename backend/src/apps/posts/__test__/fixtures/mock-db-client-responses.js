import { makeFakeRawPost } from "./post.js";

let { id, createdAt, userId, title, postContent, imgCdn } = makeFakeRawPost();
export function makeFakeSinglePostRecord(overrides) {
  let post = {
    id,
    created_at: createdAt,
    fk_uid: userId,
    title,
    post_content: postContent,
    img_cdn: imgCdn,
  };
  return { ...post, ...overrides };
}
export function makeFakeListOfPostRecords(overrides) {
  let post = {
    id,
    created_at: createdAt,
    fk_uid: userId,
    title,
    post_content: postContent,
    img_cdn: imgCdn,
  };
  return [{ ...post, ...overrides }];
}
