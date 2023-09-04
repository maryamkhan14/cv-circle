export default function makeGetUser({ retrieveUser }) {
  return async function getUser(httpRequest) {
    try {
      let { userId } = httpRequest.params || httpRequest.user;
      console.log(httpRequest.params, httpRequest.user);
      if (!userId)
        throw new Error("Error retrieving user: no user ID provided.");
      const user = await retrieveUser(userId);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { user },
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
