// credit: https://github.com/dev-mastery/comments-api.git
// purpose: this is an adapter that provides extra layer of indirection (separation) to deal with req and res variables, instead of having the controllers doing so.
export default function makeExpressCallback(controller, requiresAuth = false) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      sessionStore: req.sessionStore,
      sessionID: req.sessionID,
      logOut: req.logOut,
      session: req.session,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    try {
      if (requiresAuth && !req.isAuthenticated()) {
        throw new Error("Not authenticated");
      }
      let httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }
      res.type("json");
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "An unknown error occurred." });
    }
  };
}
