export default function makeSessionsCache({ cacheClient }) {
  return Object.freeze({ add, remove });
  async function add(streamId, sessionInformation) {
    const session = JSON.stringify(sessionInformation);
    console.log(session);
    let previouslyStreamed = await checkPreviouslyStreamed(
      sessionInformation.sessionId
    );
    if (!previouslyStreamed) {
      let addedKey = await cacheClient.xAdd(streamId, "*", { session });
      console.log(addedKey);
      await cacheClient.hSet(
        "session_keys",
        sessionInformation.sessionId,
        addedKey
      );
      return addedKey;
    }
  }
  async function remove(streamId, sessionId) {
    const session = JSON.stringify({ sessionId });
    console.log(session);
    let sessionTombstone = await cacheClient.xAdd(streamId, "*", { session });
    let keyDeletionStatus = await cacheClient.hDel("session_keys", sessionId);
    return keyDeletionStatus;
  }
  async function checkPreviouslyStreamed(sessionId) {
    return await cacheClient.hExists("session_keys", sessionId);
  }
}
