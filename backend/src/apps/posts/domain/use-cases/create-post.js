import makePost from "../entities/post/index.js";
export default function makeCreatePost({ postsDb }) {
  return async function createPost({ ...postDetails }) {
    const post = makePost(postDetails);
    let { data: newPostRecord, error } = await postsDb.insert({
      userId: post.getUserId(),
      title: post.getTitle(),
      postContent: post.getPostContent(),
      imgCdn: post.getImage(),
      parentId: post.getParentId(),
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
