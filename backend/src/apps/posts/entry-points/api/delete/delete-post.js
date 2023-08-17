export default function makeDeletePost({ retrieveSinglePost, removePost }) {
  return async function deletePost(httpRequest) {
    try {
      const user = httpRequest.user;
      const { id: postId } = httpRequest.params;
      const post = await retrieveSinglePost(postId, false);
      if (user && user.userId === post.userId) {
        const deleted = await removePost(post);
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
        statusCode: 403,
        body: { error: "Unauthorized" },
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
