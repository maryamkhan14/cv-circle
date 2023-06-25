import buildAuthenticator from "./authenticator.js";
import authenticatorOptions from "../../../authentication/authenticator-options.js";
import configuredPassportInstance from "../../../authentication/passport-setup/index.js";

const authenticator = buildAuthenticator({
  authenticator: configuredPassportInstance,
});

export default authenticator(authenticatorOptions);
