import { createClient } from "redis";
let redisClient = createClient({
  url: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});
redisClient.connect().catch(console.error);
export default redisClient;
