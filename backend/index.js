const dotenv = require("dotenv").config();
const expressSession = require("express-session");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/auth-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const app = express();

app.use(
  expressSession({
    name: "user",
    secret: "keyboard cat",
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(routes);

app.listen("5000", () => {
  console.log("server running");
});
