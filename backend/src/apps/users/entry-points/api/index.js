import express from "express";
import {
  getGoogleAuth,
  getGithubAuth,
  getGoogleAuthCallback,
  getGithubAuthCallback,
  getAuthSuccess,
  postLogout,
  patchUser,
} from "./users-controller.js";
import makeExpressCallback from "../../express-callback/index.js";
import authMiddleware from "../../auth-middleware/index.js";

const router = express.Router();
router.get("/google", getGoogleAuth);
router.get("/github", getGithubAuth);
router.get(process.env.GOOGLE_CALLBACK_URL, getGoogleAuthCallback);
router.get(process.env.GITHUB_CALLBACK_URL, getGithubAuthCallback);
router.get("/success", makeExpressCallback(getAuthSuccess));
router.post("/logout", makeExpressCallback(postLogout));
router.patch("/user", authMiddleware(true), makeExpressCallback(patchUser));
export default router;
