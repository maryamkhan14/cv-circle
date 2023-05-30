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
router.get("/:postId", async (req, res) => {
  let { data, err } = await getPost(req.params.postId);
  if (data) {
    res.send(data);
  } else {
    res.send(err);
  }
});
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
