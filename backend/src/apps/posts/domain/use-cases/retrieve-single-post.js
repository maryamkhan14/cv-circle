import makePost from "../entities/post/index.js";
export default function makeRetrieveSinglePost({ postsDb }) {
  return async function retrieveSinglePost(id) {
    let { data: postRecord, error } = await postsDb.getById(id);
    //TODO: check if test needs to be updated
    if (error) {
      throw new Error(
        `Error retrieving post: ${error.message}. Post retrieval failed.`
      );
    }
    let post = makePost(...postRecord);
    return post.getDTO();
  };
}
