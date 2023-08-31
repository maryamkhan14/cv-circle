/* istanbul ignore file */

import "dotenv/config";
import postRoutes from "./api/index.js";
import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import { sessionDetailsConsumer } from "./message-queue/index.js";
import { cacheStore } from "../data-access/index.js";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(
  session({
    store: cacheStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    proxy: true,
    cookie: {
      maxAge: 86400000,
      secure: process.env.DEV ? false : true,
      sameSite: process.env.DEV ? true : "none",
      httpOnly: true,
    },
    saveUninitialized: false,
  })
);

app.use(expressFileUpload());
const whitelist = [
  "https://cv-circle.onrender.com",
  process.env.DEV_FRONTEND_URL,
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
  sessionDetailsConsumer();
});
export default app;
