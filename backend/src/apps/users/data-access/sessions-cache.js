export default function makeSessionsCache({ cacheClient }) {
  return Object.freeze({ add });
  async function add(streamId, sessionInformation) {
    const session = JSON.stringify(sessionInformation);
    console.log(session);
    return await cacheClient.xAdd(streamId, "*", { session });
  }
}
