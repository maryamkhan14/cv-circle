import makePost from "../entities/post/index.js";
export default function makeRetrievePosts({ postsDb }) {
  return async function retrievePosts() {
    let { data: posts, error } = await postsDb.getAll();
    if (error) {
      throw new Error(
        `Error retrieving posts: ${error.message}. Post retrieval failed.`
      );
    }
    let formattedPosts = posts.map(
      ({ id, createdAt, userId, title, postContent, imgCdn }) => {
        let post = makePost({
          id,
          createdAt,
          userId,
          title,
          postContent,
          imgCdn,
        });

        return post.getDTO();
      }
    );
    return formattedPosts;
  };
}
