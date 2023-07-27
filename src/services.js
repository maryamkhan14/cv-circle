import axios from "axios";
axios.defaults.withCredentials = true;
const getPost = async (postId) => {
  try {
    return await axios.get(`http://localhost:3000/api/posts/${postId}`, {
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
    return await axios.get(`http://localhost:3000/api/posts`, {
      withCredentials: true,
    });
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};

const updatePost = async (post, id) => {
  try {
    let { data: updatedPost } = await axios.patch(
      `http://localhost:3000/api/posts/${id}`,
      post,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return updatedPost;
  } catch (e) {
    console.log(e);
    let { data, status, statusText } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg || statusText, status };
  }
};

const createPost = async (post) => {
  try {
    let { data: newPost } = await axios.post(
      "http://localhost:3000/api/posts",
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
      `http://localhost:3000/post/upvote/${postId}`,
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
    `http://localhost:3000/post/hasUpvoted/${id}`,
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
  try {
    let { data: deletedPost } = await axios.delete(
      `http://localhost:3000/api/posts/${postId}`
    );
    return deletedPost;
  } catch (e) {
    console.log(e);
    let { data, status, statusText } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg || statusText, status };
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
