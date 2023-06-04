import axios from "axios";
const uploadFile = async (formData) => {
  let result = await axios.post("http://localhost:5000/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};
const checkHasUpvoted = async (postId, userId) => {
  let result = await axios.post(
    `http://localhost:5000/post/hasUpvoted/${postId}`,
    userId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result;
};
const uploadPost = async (post) => {
  if (post.postId) {
    let result = await axios.post("http://localhost:5000/post/update", post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } else {
    let result = await axios.post("http://localhost:5000/post/create", post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  }
};
const getPost = async (postId) => {
  if (postId) {
    let result = await axios.get(`http://localhost:5000/post/${postId}`);
    return result;
  } else {
    return null;
  }
};
const upvotePost = async (postId, userId) => {
  if (postId) {
    let result = await axios.post(
      `http://localhost:5000/post/upvote/${postId}`,
      userId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } else {
    return null;
  }
};
const deletePost = async (postId) => {
  if (postId) {
    let result = await axios.delete(`http://localhost:5000/post/${postId}`);
    return result;
  } else {
    return null;
  }
};
export {
  uploadFile,
  uploadPost,
  getPost,
  upvotePost,
  checkHasUpvoted,
  deletePost,
};
