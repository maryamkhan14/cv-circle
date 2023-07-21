export default function (req, res, next) {
  console.log(req);
  if (req.session && req.session.user) {
    console.log("allowed");
    req.user = req.session.user;
    next();
  } else {
    console.log("not allowed");
    res.redirect(process.env.NOT_PERMITTED_REDIRECT);
  }
}
