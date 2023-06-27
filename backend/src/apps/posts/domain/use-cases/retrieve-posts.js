import makePost from "../entities/post/index.js";
export default function makeRetrievePosts({ postsDb }) {
  return async function retrievePosts() {
    let { data: posts, error } = await postsDb.getAll();
    if (error) {
      throw new Error(
        `Error retrieving posts: ${error.message}. Post retrieval failed.`
      );
    }
    let formattedPosts = posts.map((rawPost) => {
      let post = makePost(rawPost);

      return post.getDTO();
    });
    return formattedPosts;
  };
}
