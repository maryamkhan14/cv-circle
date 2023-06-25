export default function buildGoogleStrategy({
  GoogleStrategy,
  verificationCallback,
}) {
  let strategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/auth${process.env.GOOGLE_CALLBACK_URL}`,
    },
    verificationCallback
  );
  return strategy;
}
