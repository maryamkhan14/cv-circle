import axios from "axios";
axios.defaults.withCredentials = true;
import withErrorHandling from "../../../utils/withErrorHandling";

const DOMAIN = import.meta.env.DEV
  ? "http://localhost"
  : "https://cv-circle.com";

const getPost = async (postId) => {
  return await withErrorHandling(async () => {
    let { data } = await axios.get(`${DOMAIN}/api/posts/${postId}`, {
      withCredentials: true,
    });
    return data?.post;
  });
};

const getAllPosts = async () => {
  return await withErrorHandling(async () => {
    let { data } = await axios.get(`${DOMAIN}/api/posts/`, {
      withCredentials: true,
    });
    return data.posts;
  });
};

const updatePost = async (post, id) => {
  return await withErrorHandling(async () => {
    let { data: updatedPost } = await axios.patch(
      `${DOMAIN}/api/posts/${id}`,
      post,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return updatedPost;
  });
};

const createPost = async (post) => {
  return await withErrorHandling(async () => {
    let { data: newPost } = await axios.post(`${DOMAIN}/api/posts/`, post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return newPost;
  });
};
const votePost = async (vote) => {
  return await withErrorHandling(async () => {
    let { data: voted } = await axios.post(`${DOMAIN}/api/posts/vote`, vote, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return voted;
  });
};

const deletePost = async (postId) => {
  return await withErrorHandling(async () => {
    let { data: deletedPost } = await axios.delete(
      `${DOMAIN}/api/posts/${postId}`
    );
    return deletedPost;
  });
};
export { createPost, updatePost, getPost, getAllPosts, deletePost, votePost };
