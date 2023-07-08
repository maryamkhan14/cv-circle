import axios from "axios";
axios.defaults.withCredentials = true;
const getPost = async (postId) => {
  try {
    return await axios.get(`http://localhost:5000/api/posts/${postId}`, {
      withCredentials: true,
    });
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};
const getAllPosts = async () => {
  try {
    return await axios.get(`http://localhost:5000/api/posts`, {
      withCredentials: true,
    });
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};

const updatePost = async (post) => {
  try {
    let { data: updatedPost } = await axios.patch(
      "http://localhost:5000/api/posts",
      post,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return updatedPost;
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};

const createPost = async (post) => {
  try {
    let { data: newPost } = await axios.post(
      "http://localhost:5000/api/posts",
      post,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return newPost;
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};
const upvotePost = async (postId, userId) => {
  console.log(postId, userId);
  if (postId) {
    let { data: upvoteCount } = await axios.post(
      `http://localhost:5000/post/upvote/${postId}`,
      userId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return upvoteCount;
  } else {
    return null;
  }
};
const checkHasUpvoted = async (postId, userId) => {
  let { data: hasUpvoted } = await axios.post(
    `http://localhost:5000/post/hasUpvoted/${postId}`,
    userId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return hasUpvoted;
};
const deletePost = async (postId) => {
  if (postId) {
    let { data: deletedPost } = await axios.delete(
      `http://localhost:5000/post/${postId}`
    );
    return deletedPost;
  } else {
    return null;
  }
};
export {
  createPost,
  updatePost,
  getPost,
  getAllPosts,
  upvotePost,
  checkHasUpvoted,
  deletePost,
};
