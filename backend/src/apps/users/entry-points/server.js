import "dotenv/config";
import userRoutes from "./api/index.js";
import express from "express";
import { cacheClient as redisClient } from "../data-access/index.js";
import RedisStore from "connect-redis";
import session from "express-session";
import cors from "cors";
import configuredPassportInstance from "../authentication/passport-setup/index.js";
let redisStore = new RedisStore({ client: redisClient, prefix: "sess:" });

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
    origin: "https://cv-circle.onrender.com",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(configuredPassportInstance.initialize());
app.use(configuredPassportInstance.session());
app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
});
export default app;
