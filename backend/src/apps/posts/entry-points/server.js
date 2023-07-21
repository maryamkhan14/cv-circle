import "dotenv/config";
import postRoutes from "./api/index.js";
import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import { sessionDetailsConsumer } from "./message-queue/index.js";
import { cacheStore } from "../data-access/index.js";

const app = express();
app.use(express.json());
app.use(
  session({
    store: cacheStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

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
  sessionDetailsConsumer();
});
export default app;
