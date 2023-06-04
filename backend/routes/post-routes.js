const router = require("express").Router();
const {
  upvotePost,
  checkHasUpvoted,
  getPost,
  getAllPosts,
  updatePost,
  createPost,
  deletePost,
} = require("../services/post-services.js");

router.get("/:postId", async (req, res) => {
  let result = await getPost(req.params.postId);
  res.send(result);
});
router.get("/", async (req, res) => {
  let result = await getAllPosts();
  res.send(result);
});

router.post("/update", async (req, res) => {
  let result = await updatePost(req.body);
  console.log(result);
  res.send(result);
});

router.post("/create", async (req, res) => {
  let result = await createPost(req.body);
  console.log(result);
  res.send(result);
});

router.post("/upvote/:postId", async (req, res) => {
  let result = await upvotePost(req.params.postId, req.body.userId);
  console.log(result);
  res.send(result);
});

router.post("/hasUpvoted/:postId", async (req, res) => {
  let result = await checkHasUpvoted(req.params.postId, req.body.userId);
  res.send(result);
});

router.delete("/:postId", async (req, res) => {
  let result = await deletePost(req.params.postId);
  res.send(result);
});
module.exports = router;
