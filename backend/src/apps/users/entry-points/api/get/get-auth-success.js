export default function makeGetAuthSuccess() {
  return function (httpRequest) {
    if (httpRequest.user) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: {
          success: true,
          statusCode: 200,
          message: "Login successful",
          user: httpRequest.user,
        },
      };
    } else {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: "Login unsuccessful: no user found.",
        },
      };
    }
  };
}
