export default function makeGetSinglePost({ retrievePost }) {
  return async function (httpRequest) {
    try {
      const { postId } = httpRequest.params;
      const post = await retrievePost(postId);
      // return what res.send() should contain
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { post },
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
