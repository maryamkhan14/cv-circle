import makePost from "../entities/post/index.js";
export default function makeRemovePost({ postsDb }) {
  return async function removePost(postId, userId) {
    let { data, error } = await postsDb.remove(postId, userId);
    if (error) {
      throw new Error(
        `Error deleting post from database: ${error.message}. Post deletion failed.`
      );
    }
    if (!data) {
      throw new Error(
        `Error deleting post from database: either the post does not exist, or it does not belong to the user.`
      );
    }
    let post = makePost(...data);
    return { ...post.getDTO() };
  };
}
