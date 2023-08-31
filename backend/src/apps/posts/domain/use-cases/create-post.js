import makePost from "../entities/post/index.js";
export default function makeCreatePost({ postsDb }) {
  return async function createPost({ ...postDetails }) {
    const post = makePost(postDetails);
    let { data: newPostRecord, error } = await postsDb.insert({
      userId: post.getUserId(),
      title: post.getTitle(),
      postContent: post.getPostContent(),
      imgCdn: post.getImage(),
      path: post.getPath(),
      isReply: post.isReply(),
    });
    if (error) {
      throw new Error(
        `Error saving post to database: ${error.message}. Post creation failed.`
      );
    }
    let newPost = makePost(...newPostRecord);
    return newPost.getDTO();
  };
}
