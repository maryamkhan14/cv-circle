import makePost from "../entities/post/index.js";
export default function makeRemovePost({ postsDb }) {
  return async function removePost(postDetails) {
    const post = makePost(postDetails);
    let { error } = await postsDb.remove(post.getId(), post.getUserId());
    if (error) {
      throw new Error(
        `Error deleting post from database: ${error.message}. Post deletion failed.`
      );
    }
    return { ...post.getDTO() };
  };
}
