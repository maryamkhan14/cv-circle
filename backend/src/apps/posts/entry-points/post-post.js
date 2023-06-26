export default function makePostPost({ createPost, handleAttachmentPreview }) {
  return async function postPost(httpRequest) {
    try {
      const post = httpRequest.body;
      const image = await handleAttachmentPreview(post);
      const posted = await createPost({ ...post, imgCdn: image.getCdn() });

      // return what res.send() should contain
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(posted.modifiedOn).toUTCString(),
        },
        statusCode: 200,
        body: { posted },
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
