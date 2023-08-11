import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, createPost, updatePost } from "../services/posts-services";

const PostForm = () => {
  const { user } = useContext(UserContext);
  const { id: toEditId } = useParams(); //postId->toEditId
  const navigate = useNavigate();
  const [status, setStatus] = useState({});
  const [post, setPost] = useState({
    createdAt: "",
    id: "",
    imgCdn: "",
    postContent: "",
    title: "",
    userId: "",
    file: null,
  });

  const uploadEditedPost = async (e) => {
    e.preventDefault();
    setStatus({
      ...status,
      success: 1,
    });
    let { file } = post;
    if (!file) {
      let { error } = await updatePost({ ...post, id: toEditId }, toEditId);
      if (error) {
        setStatus({
          error: true,
          msg: error,
          success: 0,
        });
      } else {
        navigate(`/post/${toEditId}`);
      }
    } else if (checkFileConstraints(file)) {
      let { error } = await updatePost({ ...post, id: toEditId }, toEditId);
      if (error) {
        setStatus({
          error: true,
          msg: error,
          success: 0,
        });
      } else {
        navigate(`/post/${toEditId}/updated`);
      }
    } else {
      setStatus({
        error: true,
        msg: "Error: Please only attach .pdf, .png, .jpg, or .jpeg files, and ensure your file is smaller than 1MB.",
        success: 0,
      });
    }
  };

  const uploadNewPost = async (e) => {
    e.preventDefault();
    setStatus({
      ...status,
      success: 1,
      msg: "Preparing your post...",
    });
    let { file } = post;
    if (!file) {
      setStatus({
        error: true,
        msg: "Error: Please attach a resume.",
        success: 0,
      });
    } else if (checkFileConstraints(file)) {
      let { data, error } = await createPost({ ...post });
      if (error) {
        setStatus({
          error: true,
          msg: error,
          success: 0,
        });
      } else {
        let { posted } = data;
        navigate(`/post/${posted.id}`);
      }
    } else {
      setStatus({
        error: true,
        msg: "Error: Please only attach .pdf, .png, .jpg, or .jpeg files, and ensure your file is smaller than 1MB.",
        success: 0,
      });
    }
  };

  const clear = () => {
    setPost({
      createdAt: "",
      id: "",
      imgCdn: "",
      postContent: "",
      title: "",
      userId: "",
      file: null,
    });
    setStatus({});
  };

  const checkFileConstraints = (file) => {
    return (
      file.size < 1000000 &&
      (file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "application/pdf")
      //TODO: change to constants
    );
  };

  // automatically populate fields if editing existing post
  useEffect(() => {
    clear();
    if (toEditId) {
      setStatus({
        ...status,
        success: 1,
      });
      getPost(toEditId).then(({ data, error }) => {
        if (data.post) {
          setPost({ ...data.post });
          setStatus({});
        }
        if (error) {
          setStatus({ success: 0, msg: "Post not found.", error: true });
        }
      });
    }

    setPost({ ...post, userId: user.userId });
  }, []);

  return (
    <div className="flex items-stretch min-w-[80%] min-h-[80%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
      <form className="rounded flex flex-col justify-between gap-5 p-3 min-h-full w-full">
        <h1 className="text-4xl font-semibold text-slate-900">
          {toEditId ? "Edit your post" : "Create a post"}
        </h1>
        {status &&
          (status.success ? (
            <p className="font-semibold self-center text-blue-800 text-2xl">
              {status.msg}
            </p>
          ) : (
            <p className="font-semibold self-center text-amber-800 text-2xl">
              {status.msg}
            </p>
          ))}
        <div
          className={`${
            status && status.success === 1 && "animate-pulse"
          } flex w-full h-full flex-col justify-between gap-5 md:gap-4 mr-1`}
        >
          <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              className="border border-slate-800 w-full p-2 rounded"
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required="required"
              disabled={status && status.success === 1}
            />
          </span>
          <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <label htmlFor="post-content" className="font-medium">
              Post
            </label>
            <textarea
              id="post-content"
              name="post-content"
              rows="10"
              cols="50"
              value={post.postContent}
              onChange={(e) =>
                setPost({ ...post, postContent: e.target.value })
              }
              className="border border-slate-800 w-full p-2 rounded whitespace-pre-wrap"
              disabled={status && status.success === 1}
            ></textarea>
          </span>
          <span className="flex flex-col md:flex-row justify-center items-center">
            <label
              htmlFor="file"
              className={`font-medium text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg px-5 py-2.5 flex items-center justify-center ${
                status && status.success === 1 && "bg-amber-800/50"
              }`}
            >
              Attach Your Resume (only .png, .jpg, .jpeg allowed)
            </label>

            <input
              className="hidden"
              type="file"
              name="file"
              id="file"
              accept="image/png,image/jpg,image/jpeg,application/pdf"
              onInput={(e) => setPost({ ...post, file: e.target.files[0] })}
              disabled={status && status.success === 1}
            />
            {post && post.file && post.file.name ? (
              <p className="self-center m-2 italic">{post.file.name}</p>
            ) : (
              toEditId && <img src={post.imgCdn} width={100} className="m-2" />
            )}
          </span>
          <span className="flex self-center">
            <button
              type="submit"
              className="text-slate-50 bg-amber-800 disabled:bg-amber-800/50 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
              onClick={toEditId ? uploadEditedPost : uploadNewPost}
              disabled={status && status.success === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mr-2 self-center flex items-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              {toEditId ? "Update post" : "Create post"}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
