export default function buildGithubStrategy({
  GithubStrategy,
  verificationCallback,
}) {
  let strategy = new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `/api/auth${process.env.GITHUB_CALLBACK_URL}`,
    },
    verificationCallback
  );
  return strategy;
}
