import "dotenv/config";
import express from "express";
import expressFileUpload from "express-fileupload";
import expressSession from "express-session";
import cors from "cors";
import configuredPassportInstance from "./apps/users/authentication/passport-setup/index.js";

import postsRouter from "./apps/posts/entry-points/routes.js";
import authRouter from "./apps/users/entry-points/routes.js";

const app = express();
app.use(express.json());

app.use(
  expressSession({
    secret: "keyboard cat",
    cookie: {
      maxAge: 24 * 60 * 60 * 100,
      httpOnly: true,
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(expressFileUpload());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
app.use(configuredPassportInstance.initialize());
app.use(configuredPassportInstance.session());
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
  console.log(process.env.VITE_SUPABASE_URL);
  console.log(process.env.GOOGLE_CALLBACK_URL);
});

export default app;
