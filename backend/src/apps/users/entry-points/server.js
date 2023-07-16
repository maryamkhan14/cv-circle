import "dotenv/config";
import userRoutes from "./api/index.js";
import express from "express";
import expressSession from "express-session";
import cors from "cors";
import configuredPassportInstance from "../authentication/passport-setup/index.js";
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
});

export default app;
