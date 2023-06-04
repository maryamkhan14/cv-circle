const supabase = require("../client.js");

const getAllPosts = async () => {
  return await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false });
};

const getPost = async (postId) => {
  return await supabase.from("posts").select().eq("id", postId);
};

const updatePost = async ({ title, postContent, cdnUrl, postId }) => {
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

const deletePost = async (postId) => {
  return await supabase.from("posts").delete().eq("id", postId);
};
module.exports = {
  getPost,
  getAllPosts,
  updatePost,
  createPost,
  upvotePost,
  checkHasUpvoted,
  deletePost,
};
