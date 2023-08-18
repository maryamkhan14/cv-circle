import axios from "axios";
axios.defaults.withCredentials = true;
const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";
const getPost = async (postId) => {
  try {
    return await axios.get(`${DOMAIN}/api/posts/${postId}`, {
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
    return await axios.get(`${DOMAIN}/api/posts/`, {
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
      `${DOMAIN}/api/posts/${id}`,
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
    let { data: newPost } = await axios.post(`${DOMAIN}/api/posts/`, post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return newPost;
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};
const votePost = async (vote) => {
  try {
    let { data: voted } = await axios.post(`${DOMAIN}/api/posts/vote`, vote, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return voted;
  } catch (e) {
    let { data, status } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg, status };
  }
};
const deletePost = async (postId) => {
  try {
    let { data: deletedPost } = await axios.delete(
      `${DOMAIN}/api/posts/${postId}`
    );
    return deletedPost;
  } catch (e) {
    console.log(e);
    let { data, status, statusText } = e.response;
    let errorMsg = data.error;
    return { error: errorMsg || statusText, status };
  }
};
export { createPost, updatePost, getPost, getAllPosts, deletePost, votePost };
