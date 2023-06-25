export default function buildAuthenticator({ authenticator }) {
  return function ({ callbackOptions, scopeOptions }) {
    return Object.freeze({
      authGoogleCallback: authenticator.authenticate("google", callbackOptions),
      authGithubCallback: authenticator.authenticate("github", callbackOptions),
      authGoogle: authenticator.authenticate("google", {
        scope: scopeOptions["google"],
      }),
      authGithub: authenticator.authenticate("github", {
        scope: scopeOptions["github"],
      }),
    });
  };
}
