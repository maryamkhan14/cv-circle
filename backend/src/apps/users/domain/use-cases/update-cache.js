export default function makeUpdateCache({ sessionsCache }) {
  return function updateCache(user) {
    let added = sessionsCache.add("mystream", user);
    console.log("ADDED:", added);
  };
}
