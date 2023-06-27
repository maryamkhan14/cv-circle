import makePost from "../entities/post/index.js";
export default function makeCreatePost({ postsDb }) {
  return async function createPost({ userId, title, postContent, imgCdn }) {
    const post = makePost({
      userId, // todo: synchronize names
      title,
      postContent,
      imgCdn,
    });
    let { data: newPostRecord, error } = await postsDb.insert({
      userId: post.getUserId(),
      title: post.getTitle(),
      postContent: post.getPostContent(),
      imgCdn: post.getImage(),
    });
    if (error) {
      throw new Error(
        `Error saving post to database: ${error.message}. Post creation failed.`
      );
    }
    post.setCreatedAt(newPostRecord.createdAt);
    post.setId(newPostRecord.id);
    return post.getDTO();
    //idea: only return createdAt, and postId, of database record created?
  };
}
