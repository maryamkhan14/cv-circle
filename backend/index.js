const dotenv = require("dotenv").config();
const expressSession = require("express-session");
const express = require("express");
const expressFileUpload = require("express-fileupload");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");
const fileUploadRoutes = require("./routes/file-upload-routes");
const postRoutes = require("./routes/post-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");

const app = express();

app.use(
  expressSession({
    secret: "keyboard cat",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(expressFileUpload());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/file", fileUploadRoutes);

app.listen("5000", () => {
  console.log("server running");
});
