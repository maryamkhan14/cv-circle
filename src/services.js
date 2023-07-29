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
    return await axios.get(`http://localhost:3000/api/posts/`, {
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
      "http://localhost:3000/api/posts/",
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
const votePost = async (vote) => {
  try {
    let { data: voted } = await axios.post(
      "http://localhost:3000/api/posts/vote",
      vote,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
export { createPost, updatePost, getPost, getAllPosts, deletePost, votePost };
