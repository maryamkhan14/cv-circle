const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

router.get("/auth/success", (req, res) => {
  if (req.user) {
    console.log("req");
    console.log("got this far");
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: req.user,
    });
  } else {
  }
});
router.get(
  "/github/signup",
  passport.authenticate("github", { scope: ["user"] })
);

/**
router.get(process.env.GITHUB_CALLBACK_URL, (req, res, next) => {
  passport.authenticate(
    "github",
    { failureRedirect: "/github/error" },
    async (error, user, info) => {
      if (error) {
        return res.send({ message: error.message });
      }
      if (user) {
        try {
          //let result = await socialLogin(user.email);
          // here your business logic for login user.
          return res.send({
            user: user,
            message: "Login Successful",
            status: res.statusCode,
          });
        } catch (error) {
          return res.send({ message: error.message, status: res.statusCode });
        }
      }
    }
  )(req, res, next);
});
*/

router.get(
  process.env.GITHUB_CALLBACK_URL,
  passport.authenticate("github", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});
module.exports = router;
