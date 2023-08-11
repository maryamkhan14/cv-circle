import React from "react";
import { useState, useEffect, useContext } from "react";
import { createPost, updatePost } from "../services/posts-services";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const ReplyForm = ({ mode, setReplyFormActive, original }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const defaults = {
    createdAt: "",
    id: "",
    imgCdn: "",
    postContent: "",
    title: "",
    userId: user?.userId || "",
    file: null,
    path: original.path,
    isReply: true,
  };
  const [post, setPost] = useState({
    ...defaults,
  });

  const uploadEditedPost = async (e) => {
    e.preventDefault();
    await updatePost({ ...post }, post.id); //TODO: set status

    clear();
    navigate(0);
  };

  const uploadNewPost = async (e) => {
    e.preventDefault();

    await createPost({ ...post });

    clear();
    navigate(0);
  };

  const clear = () => {
    setPost({ defaults });
  };

  const close = () => {
    clear();
    setReplyFormActive(false);
  };
  // automatically populate fields if editing existing post
  useEffect(() => {
    if (mode == "edit") {
      setPost({ ...original });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full">
      <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
        <label htmlFor="post-content" className="hidden">
          Reply
        </label>
        <textarea
          id="post-content"
          name="post-content"
          rows="4"
          cols="50"
          value={post.postContent}
          onChange={(e) => setPost({ ...post, postContent: e.target.value })}
          className="border border-slate-800 w-full p-2 rounded whitespace-pre-wrap"
        ></textarea>
        <span className="flex flex-row md:flex-col justify-center gap-3 m-3">
          <button
            type="submit"
            aria-label="Submit"
            className="text-slate-50 text-xs bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
            onClick={mode === "edit" ? uploadEditedPost : uploadNewPost}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4  self-center flex items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>

          <button
            type="submit"
            aria-label="Cancel edit"
            className="text-slate-50 text-xs bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
            onClick={close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4  self-center flex items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      </span>
    </div>
  );
};

export default ReplyForm;
