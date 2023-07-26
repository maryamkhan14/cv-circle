import makePost from "../entities/post/index.js";
export default function makeUpdatePost({ postsDb }) {
  return async function updatePost(postDetails) {
    const post = makePost(postDetails);
    let { data: updatedPostRecord, error } = await postsDb.update({
      id: post.getId(),
      userId: post.getUserId(),
      title: post.getTitle(),
      postContent: post.getPostContent(),
      imgCdn: post.getImage(),
    });
    if (error) {
      throw new Error(
        `Error saving post to database: ${error.message}. Post update failed.`
      );
    }
    return { ...post.getDTO() };
  };
}
//TODO: Add test
