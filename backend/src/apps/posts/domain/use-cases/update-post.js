import makePost from "../entities/post/index.js";
export default function makeUpdatePost({ postsDb }) {
  return async function updatePost({ id, userId, title, postContent, imgCdn }) {
    const post = makePost({ id, userId, title, postContent, imgCdn });
    let error;
    let updatedPostRecord;
    if (imgCdn) {
      let { data: updatedPostRecord, error } = await postsDb.update({
        id: post.getId(),
        userId: post.getUserId(),
        title: post.getTitle(),
        postContent: post.getPostContent(),
        imgCdn: post.getImage(),
      });
    } else {
      let { data: updatedPostRecord, error } = await postsDb.update({
        id: post.getId(),
        userId: post.getUserId(),
        title: post.getTitle(),
        postContent: post.getPostContent(),
      });
    }
    if (error) {
      throw new Error(
        `Error saving post to database: ${error.message}. Post update failed.`
      );
    }
    return post.getDTO();
  };
}
