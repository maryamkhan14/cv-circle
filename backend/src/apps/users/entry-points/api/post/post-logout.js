import withErrorHandling from "../../../utils/with-error-handling.js";

export default function makePostLogout({ uncacheUser }) {
  return async function (httpRequest) {
    try {
      if (httpRequest.sessionStore) {
        await uncacheUser(httpRequest.sessionId);
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
          body: {
            success: true,
            statusCode: 200,
            message: "Logout successful.",
          },
        };
      } else {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 400,
          body: {
            error: "Logout unsuccessful: no session found.",
          },
        };
      }
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
