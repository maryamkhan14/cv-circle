import "dotenv/config";
import postRoutes from "./api/index.js";
import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import session from "express-session";
import { sessionDetailsConsumer } from "./message-queue/index.js";
import { cacheStore } from "../data-access/index.js";

const app = express();
app.enable("trust proxy");
app.use(express.json());
app.use(
  session({
    store: cacheStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    proxy: true,
    saveUninitialized: false,
  })
);

app.use(expressFileUpload());
app.use(
  cors({
    origin: "https://cv-circle.onrender.com",
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
