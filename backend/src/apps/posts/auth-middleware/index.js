export default function (sameUserNecessary = false) {
  return function (req, res, next) {
    req.user = req.session?.user;
    if (!req.hasOwnProperty("isAuthenticated")) {
      req.isAuthenticated = () => (req.user ? true : false);
    }
    if (!req.isAuthenticated()) {
      console.log("no user");
      res.status(403).send({ error: "Unauthorized" });
    } else if (sameUserNecessary && !isSameUser(req)) {
      console.log("must be same");
      res.status(403).send({ error: "Unauthorized" });
    } else {
      next();
    }
  };
  function isSameUser(req) {
    return req.body?.userId && req.user.userId === req.body.userId;
  }
}
