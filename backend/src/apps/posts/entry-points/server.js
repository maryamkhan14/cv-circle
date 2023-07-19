import "dotenv/config";
import postRoutes from "./api/index.js";
import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import { Kafka } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
const app = express();
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["broker:29092"],
});
const registry = new SchemaRegistry({ host: "http://schema-registry:8081/" });
const consumer = kafka.consumer({ groupId: "posts-connect" });
app.use(express.json());
app.use(expressFileUpload());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
  getMessages();
});
async function getMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: "mystream", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message);
      console.log(message.value);
      console.log(message.key);
    },
  });
}
export default app;
