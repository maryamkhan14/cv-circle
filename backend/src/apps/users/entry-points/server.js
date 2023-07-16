import "dotenv/config";
import userRoutes from "./api/index.js";
import express from "express";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import session from "express-session";
import cors from "cors";
import configuredPassportInstance from "../authentication/passport-setup/index.js";
let redisClient = createClient({
  url: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});
redisClient.connect().catch(console.error);
let redisStore = new RedisStore({ client: redisClient });

const app = express();

app.use(express.json());
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { maxAge: 86400000 },
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(configuredPassportInstance.initialize());
app.use(configuredPassportInstance.session());
app.use("/api/auth", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
  testScan();
});
async function testScan() {
  for await (const key of redisClient.scanIterator({
    MATCH: "sess:*",
    COUNT: 100,
  })) {
    const log = await redisClient.get(key);
    if (log) {
      console.log(JSON.parse(log));
    }
  }
}
export default app;
