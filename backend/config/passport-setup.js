const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const supabase = require("../client.js");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth${process.env.GOOGLE_CALLBACK_URL}`,
    },
    function (accessToken, refreshToken, profile, done) {
      supabase
        .from("users")
        .upsert({
          uid: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilepic: profile.photos[0].value,
        })
        .select()
        .then((data) => console.log(data));
      done(null, {
        user: {
          name: profile.displayName,
          id: profile.id,
          profilePic: profile.photos[0].value,
          email: profile.emails[0].value,
        },
      });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `/auth${process.env.GITHUB_CALLBACK_URL}`,
    },
    function (accessToken, refreshToken, profile, done) {
      supabase
        .from("users")
        .upsert({
          uid: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilepic: profile.photos[0].value,
        })
        .select()
        .then((data) => console.log(data));
      done(null, {
        user: {
          name: profile.displayName,
          id: profile.id,
          profilePic: profile.photos[0].value,
          email: profile.emails[0].value,
        },
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
