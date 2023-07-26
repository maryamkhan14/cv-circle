import { makeFakeRawPost } from "./post.js";

export function makeFakeSingleRawPostRecord(overrides) {
  let { id, createdAt, userId, title, postContent, imgCdn, upvoteCount } =
    makeFakeRawPost();
  let post = {
    id,
    created_at: createdAt,
    fk_uid: userId,
    title,
    post_content: postContent,
    img_cdn: imgCdn,
    upvote_count: upvoteCount,
  };
  return [{ ...post, ...overrides }];
}
export function makeFakeListOfRawPostRecords(overrides) {
  let posts = [makeFakeRawPost({ id: 1 }), makeFakeRawPost({ id: 2 })];
  return posts.map((post) => {
    let newPost = {
      id: post.id,
      created_at: post.createdAt,
      fk_uid: post.userId,
      title: post.title,
      post_content: post.postContent,
      img_cdn: post.imgCdn,
      upvote_count: post.upvoteCount,
    };
    return { ...newPost, ...overrides };
  });
}
