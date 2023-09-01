export default function makeDeletePost({ removePost }) {
  return async function deletePost(httpRequest) {
    try {
      const user = httpRequest.user;
      const { id: postId } = httpRequest.params;
      const deleted = await removePost(
        postId,
        user.userId || /* istanbul ignore next */ -1
      );
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { deleted },
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
