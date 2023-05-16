const router = require("express").Router();
const supabase = require("../client.js");

router.post("/upload", (req, res) => {
  console.log(req.body);
  res.send({ file: 400 });
});

router.get("/upload", (req, res) => {
  res.send({ msg: "received" });
});
module.exports = router;
