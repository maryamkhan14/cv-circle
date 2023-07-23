export default function (req, res, next) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    console.log("not allowed");
    res.redirect(process.env.NOT_PERMITTED_REDIRECT);
  }
}
