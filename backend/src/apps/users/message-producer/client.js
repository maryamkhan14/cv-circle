import { Kafka } from "kafkajs";
const messageBus = new Kafka({
  clientId: "my-app",
  brokers: ["broker:29092"],
  retry: {
    initialRetryTime: 300,
    retries: 8,
  },
});

export default messageBus;
