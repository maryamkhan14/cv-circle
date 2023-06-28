import { makeFakeRawPost } from "./post.js";

export function makeFakeSinglePostRecord(overrides) {
  let { id, createdAt, userId, title, postContent, imgCdn } = makeFakeRawPost();
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
export function makeFakeListOfPostRecords(overrides) {
  let posts = [makeFakeRawPost({ id: 1 }), makeFakeRawPost({ id: 2 })];
  return posts.map((post) => {
    let newPost = {
      id: post.id,
      created_at: post.createdAt,
      fk_uid: post.userId,
      title: post.title,
      post_content: post.postContent,
      img_cdn: post.imgCdn,
    };
    return { ...newPost, ...overrides };
  });
}
