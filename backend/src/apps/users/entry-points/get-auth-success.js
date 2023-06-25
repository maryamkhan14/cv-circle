export default function makeGetAuthSuccess() {
  return function (httpRequest) {
    if (httpRequest.user) {
      return {
        success: true,
        statusCode: 200,
        message: "Login successful",
        user: httpRequest.user,
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "Login unsuccessful",
      };
    }
  };
}
