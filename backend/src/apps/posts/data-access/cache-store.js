/* istanbul ignore file */
import { createClient } from "redis";
import RedisStore from "connect-redis";

let redisClient = createClient({
  url: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({ client: redisClient, prefix: "" });
export default redisStore;
