export default function makeGetAllPosts({ retrievePosts }) {
  return async function getAllPosts() {
    try {
      const posts = await retrievePosts();
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { posts },
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
