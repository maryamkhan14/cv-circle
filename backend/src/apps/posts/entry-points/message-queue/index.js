import {Kafka} from "kafkajs";

const kafka = new Kafka({clientId: process.env.KAFKA_CLIENT_ID, brokers: [process.env.KAFKA_BROKER_URL]});
const producer = kafka.producer()
await producer.connect()
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })
await consumer.connect()
await consumer.subscribe({ topic: process.env.KAFKA_GET_AUTH_TOPIC, fromBeginning: true })

export {producer, consumer}