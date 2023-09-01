export default function makeSessionsCache({ cacheStore }) {
  return Object.freeze({ get, set });
  async function get(sessionId) {
    return await cacheStore.client.get(sessionId);
  }
  async function set(
    sessionId,
    /* istanbul ignore next */ sessionDetails = null
  ) {
    if (sessionDetails) {
      return await cacheStore.set(
        sessionId,
        sessionDetails,
        /* istanbul ignore next */ () => {}
      );
    }
    await destroy(sessionId);
  }
  async function destroy(sessionId) {
    return await cacheStore.destroy(
      sessionId,
      /* istanbul ignore next */ () => {}
    );
  }
}
