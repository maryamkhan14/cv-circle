import makePost from "../entities/post/index.js";
export default function makeRetrievePosts({ postsDb }) {
  return async function retrievePosts() {
    let posts = await postsDb.getAll();
    let formattedPosts = posts.map((post) => {
      makePost({
        userId: post.uid,
        title: post.title,
        postContent: post.post_content,
        imgCdn: post.img_cdn,
      });
    });
    return formattedPosts;
  };
}
