export default function makePatchPost({ updatePost, handleAttachmentPreview }) {
  return async function patchPost(httpRequest) {
    try {
      const post = httpRequest.body;
      let image;
      if (post.file) {
        image = await handleAttachmentPreview(post);
      }
      const toUpdate = post.file ? { ...post, ...image.getCdn() } : post;
      const updated = await updatePost(toUpdate);
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(updated.modifiedOn).toUTCString(),
        },
        statusCode: 200,
        body: { updated },
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
