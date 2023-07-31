export default function buildProducer({ producer }) {
  return Object.freeze({
    connect: async () => await producer.connect(),
    send: (topic, message) => {
      console.log(topic);
      producer.send({ topic, messages: [{ value: JSON.stringify(message) }] });
    },
    disconnect: async () => await producer.disconnect(),
  });
}
