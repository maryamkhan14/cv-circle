export default function makeSessionsCache({ cacheClient }) {
  return Object.freeze({ add });
  async function add(streamId, message) {
    console.log(message);
    let { sessionId, sessionDetails } = message;
    sessionDetails = JSON.stringify(sessionDetails);
    return await cacheClient.xAdd(streamId, "*", { sessionId, sessionDetails });
  }
}
