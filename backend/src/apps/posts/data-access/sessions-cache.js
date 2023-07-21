export default function makeSessionsCache({ cacheStore }) {
  return Object.freeze({ get, set, setSession });
  async function get(sessionId) {
    return await cacheStore.client.get(sessionId);
  }
  async function set(sessionId, sessionDetails = null, ttl = null) {
    if (sessionDetails) {
      return await cacheStore.set(sessionId, sessionDetails, () => {});
    }
    await destroy(sessionId);
  }
  async function destroy(sessionId) {
    return await cacheStore.destroy(sessionId, () => {});
  }
  async function setSession(sessionId, sessionDetails) {
    if (sessionDetails) {
      return await cacheStore.set(sessionId, sessionDetails, () => {});
    }
  }
}
