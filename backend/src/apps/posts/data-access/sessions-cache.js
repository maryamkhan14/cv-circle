export default function makeSessionsCache({ cacheClient }) {
  return Object.freeze({ get, set });
  async function get(sessionId) {
    return await cacheClient.get(sessionId);
  }
  async function set(sessionId, sessionDetails) {
    if (Object.keys(sessionDetails).length === 0) {
      console.log("deleting session");
      return await cacheClient.del(sessionId);
    }
    return await cacheClient.set(sessionId, sessionDetails);
  }
}
