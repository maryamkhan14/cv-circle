import axios from "axios";
const getPost = async (postId) => {
  if (postId) {
    let { data: singlePost } = await axios.get(
      `http://localhost:5000/post/${postId}`
    );
    return singlePost;
  } else {
    return null;
  }
};
const getAllPosts = async () => {
  return await axios.get(`http://localhost:5000/api/posts`);
};
const uploadFile = async (formData) => {
  let { data: fileCdn } = await axios.post(
    "http://localhost:5000/file/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return fileCdn;
};

const testUploadPost = async (post) => {
  let result = await axios.post("http://localhost:5000/api/posts", post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(result);
  return result;
};
const uploadPost = async (post) => {
  if (post.postId) {
    let { data: updatedPost } = await axios.post(
      "http://localhost:5000/post/update",
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return updatedPost;
  } else {
    let { data: newPost } = await axios.post(
      "http://localhost:5000/post/create",
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return newPost;
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
  uploadFile,
  uploadPost,
  getPost,
  getAllPosts,
  upvotePost,
  checkHasUpvoted,
  deletePost,
  testUploadPost,
};
