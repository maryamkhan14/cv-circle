import { Kafka } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { sessionsCache } from "../../data-access/index.js";
import makeSessionDetailsConsumer from "./session-details-consumer.js";
import makeConsumer from "./consumer.js";
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER_URL],
});
const registry = new SchemaRegistry({ host: "http://schema-registry:8081/" });
const consumer = makeConsumer({ broker: kafka });
await consumer.connect();
const sessionDetailsConsumer = makeSessionDetailsConsumer({
  consumer,
  sessionsCache,
  registry,
});
export { sessionDetailsConsumer };
