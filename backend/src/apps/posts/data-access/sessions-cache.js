export default function makeSessionsCache({ cacheStore }) {
  return Object.freeze({ get, set });
  async function get(sessionId) {
    return await cacheStore.client.get(sessionId);
  }
  async function set(sessionId, sessionDetails) {
    if (Object.keys(sessionDetails).length === 0) {
      console.log("deleting session");
      return await cacheStore.destroy(sessionId, () => {});
    }
    await cacheStore.set(sessionId, sessionDetails, () => {});
  }
}
