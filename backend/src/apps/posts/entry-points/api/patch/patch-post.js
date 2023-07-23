export default function makePatchPost({ updatePost, handleAttachmentPreview }) {
  return async function patchPost(httpRequest) {
    try {
      const user = httpRequest.user;
      const post = httpRequest.body;
      if (user && user.userId === post.userId) {
        let extension = post.imgCdn.split(process.env.DB_BASE_CDN_URL).pop();
        if (post.file) {
          await handleAttachmentPreview({ ...post, ...{ extension } });
        }
        const toUpdate = post;
        const updated = await updatePost(toUpdate);
        return {
          headers: {
            "Content-Type": "application/json",
            "Last-Modified": new Date(updated.modifiedOn).toUTCString(),
          },
          statusCode: 200,
          body: { updated },
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
