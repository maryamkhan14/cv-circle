const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passport-setup");

router.get(
  "/github/signup",
  passport.authenticate("github", { scope: ["user"] })
);

router.get("/github/redirect", (req, res, next) => {
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
router.get("/login");
module.exports = router;
