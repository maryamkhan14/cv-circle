import makePost from "../entities/post/index.js";
export default function makeCreatePost({ postsDb }) {
  return async function createPost({ userId, title, postContent, imgCdn }) {
    const post = makePost({
      userId, // todo: synchronize names
      title,
      postContent,
      imgCdn,
    });
    return postsDb.insert({
      userId: post.getUserId(),
      title: post.getTitle(),
      postContent: post.getPostContent(),
      imgCdn: post.getImage(),
    });
  };
}
