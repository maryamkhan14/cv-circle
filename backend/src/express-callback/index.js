// credit: https://github.com/dev-mastery/comments-api.git
// purpose: this is an adapter that provides extra layer of indirection (separation) to deal with req and res variables, instead of having the controllers doing so.
export default function makeExpressCallback(controller) {
  return async (req, res) => {
    const httpRequest = {
      body: { ...req.body, ...req.files },
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    try {
      let httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }
      res.type("json");
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (e) {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  };
}
