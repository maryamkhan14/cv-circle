const router = require("express").Router();
const {
  upvotePost,
  checkHasUpvoted,
  getPost,
  updatePost,
  createPost,
  deletePost,
} = require("../services/post-services.js");

router.post("/update", async (req, res) => {
  let result = await updatePost(req.body);
  res.send({ result });
});

router.post("/create", async (req, res) => {
  let result = await createPost(req.body);
  res.send({ result });
});

router.post("/upvote/:postId", async (req, res) => {
  let { data, error } = await upvotePost(req.params.postId, req.body.userId);
  if (data) {
    res.send({ data });
  } else {
    console.log(error);
    res.send(error);
  }
});

router.get("/:postId", async (req, res) => {
  let { data, error } = await getPost(req.params.postId);
  if (data) {
    res.send(data);
  } else {
    res.send(error);
  }
});

router.post("/hasUpvoted/:postId", async (req, res) => {
  let { data, error } = await checkHasUpvoted(
    req.params.postId,
    req.body.userId
  );

  if (data) {
    res.send(data);
  } else {
    res.send(error);
  }
});

router.delete("/:postId", async (req, res) => {
  let { data, error } = await deletePost(req.params.postId);

  if (data) {
    res.send(data);
  } else {
    res.send(error);
  }
});
module.exports = router;
