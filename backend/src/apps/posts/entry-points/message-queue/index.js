import {Kafka} from "kafkajs";

const kafka = new Kafka({clientId: 'posts', brokers: ['localhost:9092']});
const producer = kafka.producer()
await producer.connect()
const consumer = kafka.consumer({ groupId: 'get-auth' })
await consumer.connect()
await consumer.subscribe({ topic: 'get-auth', fromBeginning: true })

export {producer, consumer}