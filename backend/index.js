const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/auth-routes");
const passport = require("passport");
const app = express();

app.use(routes);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.listen("5000", () => {
  console.log("server running");
});
