import { updateCache } from "../../domain/use-cases/index.js";
import authenticator from "../../domain/services/authenticator/index.js";
import makeGetGoogleAuth from "./get/get-google-auth.js";
import makeGetGithubAuth from "./get/get-github-auth.js";
import makeGetGithubAuthCallback from "./get/get-github-auth-callback.js";
import makeGetGoogleAuthCallback from "./get/get-google-auth-callback.js";
import makeGetAuthSuccess from "./get/get-auth-success.js";
import makePostLogout from "./post/post-logout.js";

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

const getAuthSuccess = makeGetAuthSuccess({ updateCache });
const postLogout = makePostLogout();

const userController = Object.freeze({
  getGoogleAuth,
  getGoogleAuthCallback,
  getGithubAuth,
  getGithubAuthCallback,
  getAuthSuccess,
  postLogout,
});

export default { userController };

export {
  getGoogleAuth,
  getGoogleAuthCallback,
  getGithubAuth,
  getGithubAuthCallback,
  getAuthSuccess,
  postLogout,
};
