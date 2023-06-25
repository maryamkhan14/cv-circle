export default function passportSetup({
  passport,
  googleStrategy,
  githubStrategy,
}) {
  passport.use(googleStrategy);
  passport.serializeUser((user, done) => {
    done(null, { ...user.getDTO() });
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  return passport;
}
