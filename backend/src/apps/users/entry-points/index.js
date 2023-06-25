import authenticator from "../domain/services/authenticator/index.js";
import makeGetGoogleAuth from "./get-google-auth.js";
import makeGetGithubAuth from "./get-github-auth.js";
import makeGetGithubAuthCallback from "./get-github-auth-callback.js";
import makeGetGoogleAuthCallback from "./get-google-auth-callback.js";
import makeGetAuthSuccess from "./get-auth-success.js";

const { authGoogle, authGoogleCallback, authGithub, authGithubCallback } =
  authenticator;

const getGoogleAuth = makeGetGoogleAuth({ authGoogle });
const getGithubAuth = makeGetGithubAuth({ authGithub });
const getGoogleAuthCallback = makeGetGoogleAuthCallback({
  authGoogleCallback,
});
const getGithubAuthCallback = makeGetGithubAuthCallback({
  authGithubCallback,
});

const getAuthSuccess = makeGetAuthSuccess();

const userController = Object.freeze({
  getGoogleAuth,
  getGoogleAuthCallback,
  getGithubAuth,
  getGithubAuthCallback,
  getAuthSuccess,
});

export default { userController };

export {
  getGoogleAuth,
  getGoogleAuthCallback,
  getGithubAuth,
  getGithubAuthCallback,
  getAuthSuccess,
};
