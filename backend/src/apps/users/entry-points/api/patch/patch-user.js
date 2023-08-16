export default function makePatchUser({ saveUser, handlePicture }) {
  return async function patchPost(httpRequest) {
    try {
      let updateRequest = httpRequest.body;
      console.log(updateRequest);
      const needsExtension =
        updateRequest.file &&
        !updateRequest.profilePic.includes(process.env.DB_BASE_CDN_URL);
      let updated = {};
      if (updateRequest.file) {
        if (needsExtension) {
          // save image in db
          const image = await handlePicture(updateRequest);
          updateRequest = {
            ...updateRequest,
            profilePic: image.getCdn(),
          };
        } else {
          // update existing extension
          let extension = updateRequest.profilePic
            .split(process.env.DB_BASE_CDN_URL)
            .pop();
          await handlePicture({ ...updateRequest, ...{ extension } });
        }
      }
      updated = await saveUser(updateRequest, true);
      updated = updated.getDTO();
      console.log(updated);
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
