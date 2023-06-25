import strategies from "../authentication-strategies/index.js";
import passport from "passport";
import passportSetup from "./passport-setup.js";

const configuredPassportInstance = passportSetup({
  passport,
  ...strategies,
});
export default configuredPassportInstance;
