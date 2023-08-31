export default function makeUncacheUser({ sessionsCache }) {
  return async function uncacheUser(sessionId) {
    return await sessionsCache.remove("cache_auth", sessionId);
  };
}
