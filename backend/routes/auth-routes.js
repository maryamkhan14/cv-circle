const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

router.get("/auth/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: req.user,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Login unsuccessful",
    });
  }
});

router.get(
  "/github/signup",
  passport.authenticate("github", { scope: ["user"] })
);

router.get(
  process.env.GITHUB_CALLBACK_URL,
  passport.authenticate("github", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/google/signup",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  process.env.GOOGLE_CALLBACK_URL,
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/login/failed",
  })
);

router.post("/logout", function (req, res) {
  req.sessionStore.clear((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).clearCookie("connect.sid", {
      path: "/",
    });
    res.send({ status: res.statusCode });
  });
});
module.exports = router;
