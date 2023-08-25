export default function makeCacheUser({ sessionsCache }) {
  return async function cacheUser(session) {
    return await sessionsCache.add("cache_auth", session);
  };
}
