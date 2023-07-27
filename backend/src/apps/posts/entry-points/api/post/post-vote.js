export default function makePostVote({ votePost }) {
  return async function postVote(httpRequest) {
    try {
      const vote = httpRequest.body;
      const voted = await votePost({ vote });
      // return what res.send() should contain
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: { voted },
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
