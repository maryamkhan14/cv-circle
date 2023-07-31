export default function makeUpdateCache({ sessionsCache }) {
  return async function updateCache(session) {
    return await sessionsCache.add("cache_auth", session);
  };
}
