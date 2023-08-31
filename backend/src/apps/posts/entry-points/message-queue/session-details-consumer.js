/* istanbul ignore file*/
export default function makeSessionDetailsConsumer({
  consumer,
  sessionsCache,
  registry,
}) {
  return async function sessionDetailsConsumer() {
    await consumeMessages(handleMessages);
  };
  async function consumeMessages(handleMessages) {
    await consumer.subscribe({
      topic: process.env.SESSIONS_TOPIC,
      fromBeginning: true,
    });
    await consume(handleMessages);
  }
  async function consume(handleMessages) {
    await consumer.run({
      eachMessage: async ({ message }) => {
        const key = message.key.toString();
        const value = await registry.decode(message.value);
        await handleMessages(key, value);
      },
    });
  }
  async function handleMessages(key, value) {
    try {
      let { COOKIE: cookie, USER: user } = value;
      if (cookie && user) {
        cookie = JSON.parse(cookie);
        user = JSON.parse(user);
        await sessionsCache.set(key, { cookie, user });
      } else {
        await sessionsCache.set(key);
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  }
}
