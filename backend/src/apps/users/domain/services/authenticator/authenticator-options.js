const callbackOptions = {
  successRedirect: process.env.FRONTEND_URL,
  failureRedirect: "/login/failed", //TODO: make .env variable
};
const scopeOptions = {
  google: ["email", "profile"],
  github: ["user"],
};
export default Object.freeze({
  scopeOptions,
  callbackOptions,
});
