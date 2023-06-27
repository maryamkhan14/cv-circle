export default function makeGetSinglePost({ retrieveSinglePost }) {
  return async function (httpRequest) {
    try {
      const { id } = httpRequest.params;
      const post = await retrieveSinglePost(id);
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
