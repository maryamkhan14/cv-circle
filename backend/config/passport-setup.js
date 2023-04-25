const passport = require("passport");
const GithubStrategy = require("passport-github2");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize an user"));
    });
});
passport.use(
  new GithubStrategy(
    {
      clientID: "3b8649e0b5c49df9531d",
      clientSecret: "0fad519b801e1c1f0e0a82fc91e2c02e854eb872",
      callbackURL: "/github/redirect",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("found profile");
      console.log(profile);
      done(null, { user: profile });
    }
  )
);
