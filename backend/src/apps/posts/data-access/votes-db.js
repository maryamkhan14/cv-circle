export default function makeVotesDb({ dbClient }) {
  const normalizedProfileToDbColumns = {
    voteCount: "delta_votes",
    userId: "uid",
    postId: "pid",
  };

  function renameKeys(obj, keysMap) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );
  }

  async function vote(voteDetails) {
    let result = await dbClient.rpc("vote", {
      ...renameKeys(voteDetails, normalizedProfileToDbColumns),
    });
    return { ...result };
  }

  return Object.freeze({
    vote,
  });
}
