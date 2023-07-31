export default function buildGithubStrategy({
  GithubStrategy,
  verificationCallback,
}) {
  let strategy = new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `https://cv-circle.com/api/auth${process.env.GITHUB_CALLBACK_URL}`,
    },
    verificationCallback
  );
  return strategy;
}
