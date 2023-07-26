export default function makeDeletePost({ removePost }) {
  return async function deletePost(httpRequest) {
    try {
      const user = httpRequest.user;
      const post = httpRequest.body;
      console.log(post);
      if (user && user.userId === post.userId) {
        const deleted = await removePost(post);
        console.log(deleted, removePost);
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 200,
          body: { deleted },
        };
      }
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: { error: "Not authorized to perform this action." },
      };
    } catch (e) {
      //TODO: Error logging
      console.log(e);

      return {
        headers: { "Content-Type": "application/json" },
        statusCode: 400,
        body: { error: e.message },
      };
    }
  };
}
