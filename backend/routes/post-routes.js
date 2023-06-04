const router = require("express").Router();
const supabase = require("../client.js");
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

const upvotePost = async (postId, userId) => {
  return await supabase.rpc("upvote", {
    pid: postId,
    uid: userId,
  });
};
const checkHasUpvoted = async (postId, userId) => {
  return await supabase
    .from("upvotes")
    .select()
    .eq("fk_uid", userId)
    .eq("fk_pid", postId);
};

const getPost = async (postId) => {
  return await supabase.from("posts").select().eq("id", postId);
};
const updatePost = async ({ title, postContent, cdnUrl, postId }) => {
  console.log(cdnUrl, title);
  if (cdnUrl) {
    return await supabase
      .from("posts")
      .update({
        title: title,
        post_content: postContent,
        img_cdn: cdnUrl,
      })
      .eq("id", postId);
  } else {
    return await supabase
      .from("posts")
      .update({
        title: title,
        post_content: postContent,
      })
      .eq("id", postId);
  }
};
const createPost = async ({ userId, title, postContent, cdnUrl }) => {
  return await supabase
    .from("posts")
    .insert({
      fk_uid: userId,
      title: title,
      post_content: postContent,
      img_cdn: cdnUrl,
    })
    .select();
};
module.exports = router;
