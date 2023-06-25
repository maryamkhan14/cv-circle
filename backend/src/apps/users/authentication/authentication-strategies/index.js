import verifyUser from "../../domain/services/verify-user/index.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import buildGoogleStrategy from "./google-strategy.js";

const googleStrategy = buildGoogleStrategy({
  GoogleStrategy,
  verificationCallback: verifyUser,
}); // TODO: Repeat for GitHub Strategy

export default { googleStrategy };
