import withErrorHandling from "../../../utils/with-error-handling.js";
export default function makeDeleteUser({ removeUser }) {
  return async function deleteUser(httpRequest) {
    try {
      let { userId } = httpRequest.user;
      const deleted = await removeUser(userId);
      withErrorHandling(
        () => httpRequest.logOut,
        () => httpRequest.session.destroy
      )("Logout unsuccessful: could not clear session.");
      return {
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie":
            "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
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
