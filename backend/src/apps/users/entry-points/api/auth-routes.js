import express from "express";
import {
  getGoogleAuth,
  getGithubAuth,
  getGoogleAuthCallback,
  getGithubAuthCallback,
  getAuthSuccess,
  postLogout,
} from "./auth-controller.js";
import makeExpressCallback from "../../express-callback/index.js";

const router = express.Router();
router.get("/google", getGoogleAuth);
router.get("/github", getGithubAuth);
router.get(process.env.GOOGLE_CALLBACK_URL, getGoogleAuthCallback);
router.get(process.env.GITHUB_CALLBACK_URL, getGithubAuthCallback);
router.get("/success", makeExpressCallback(getAuthSuccess));
router.post("/logout", makeExpressCallback(postLogout));
export default router;
