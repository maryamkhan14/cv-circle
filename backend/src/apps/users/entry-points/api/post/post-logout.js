export default function makePostLogout({ updateCache }) {
  return function (httpRequest) {
    if (httpRequest.sessionStore) {
      updateCache({ sessionId: httpRequest.sessionId });
      httpRequest.logOut((err) => {
        if (err) {
          return {
            headers: {
              "Content-Type": "application/json",
            },
            statusCode: 400,
            body: {
              error: "Logout unsuccessful: could not clear session.",
            },
          };
        }
      });
      httpRequest.session.destroy((err) => {
        if (err) {
          return {
            headers: {
              "Content-Type": "application/json",
            },
            statusCode: 400,
            body: {
              error: "Logout unsuccessful: could not clear session.",
            },
          };
        }
      });
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
  };
}
