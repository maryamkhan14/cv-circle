import { makeFakeRawPost } from "./post.js";

export function makeFakeSingleRawPostRecord(overrides) {
  let {
    id,
    createdAt: created_at,
    userId: fk_uid,
    title,
    postContent: post_content,
    imgCdn: img_cdn,
    upvoteCount: upvote_count,
    isReply: is_reply,
    path,
    level,
    replies,
  } = makeFakeRawPost();
  let post = {
    id,
    created_at,
    fk_uid,
    title,
    post_content,
    img_cdn,
    upvote_count,
    is_reply,
    path,
    level,
    replies,
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
      replies: post.replies,
      is_reply: post.isReply,
      path: post.path,
      level: post.level,
    };
    return { ...newPost, ...overrides };
  });
}
