export default function (sameUserNecessary = false) {
  return function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(403).send({ error: "Unauthorized" });
    } else if (sameUserNecessary && req.user?.userId !== req.body?.userId) {
      res.status(403).send({ error: "Unauthorized" });
    } else {
      next();
    }
  };
}
