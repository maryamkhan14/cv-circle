export default function makeSessionDetailsConsumer({
  consumer,
  sessionsCache,
  registry,
}) {
  return async function sessionDetailsConsumer() {
    console.log(registry.decode);
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
    let parsedValue = JSON.parse(value);
    let { COOKIE: cookie, USER: user } = parsedValue;
    cookie = JSON.parse(cookie.string);
    user = JSON.parse(user.string);
    await sessionsCache.set(key, JSON.stringify({ ...cookie, ...user }));
  }
}
