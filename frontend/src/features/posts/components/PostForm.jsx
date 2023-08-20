import React from "react";
import { useEffect, useContext } from "react";
import { usePostMutation } from "../hooks";
import { PostFormContext } from "../context/PostFormContext";
import StatusNotification from "../../../components/status-update/StatusNotification";
import AttachmentInput from "./AttachmentInput";

const PostForm = ({ toEditId, user, postToEdit }) => {
  const { post, status, statusMsg, dispatch } = useContext(PostFormContext);
  const {
    data,
    isError,
    isLoading,
    error,
    status: serverStatus,
    mutateAsync: submit,
  } = usePostMutation(toEditId);
  useEffect(() => {
    if (user) {
      dispatch({
        type: "UPDATE_POST",
        payload: { ...post, userId: user.userId },
      });
    }
  }, [user]);

  useEffect(() => {
    if (postToEdit) {
      dispatch({
        type: "UPDATE_POST",
        payload: postToEdit,
      });
    }
  }, [postToEdit]);

  useEffect(() => {
    if (serverStatus !== "idle") {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: serverStatus,
          msg: isLoading
            ? "Preparing your post."
            : isError
            ? error
            : `Post ${toEditId ? "updated" : "created"} successfully.`,
        },
      });
    }
  }, [serverStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (toEditId || post.file) {
      submit({ ...post, id: toEditId });
    } else {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "error",
          msg: "Please attach a file.",
        },
      });
    }
  };
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_POST",
      payload: { ...post, [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="flex items-stretch min-w-[80%] min-h-[80%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
      <form className="rounded flex flex-col justify-between gap-5 p-3 min-h-full w-full">
        <h1 className="text-4xl font-semibold text-slate-900">
          {toEditId ? "Edit your post" : "Create a post"}
        </h1>
        <p>
          All fields are required. We support .png, .jpg, .jpeg, and .pdf
          formats for resumes.
        </p>
        <StatusNotification status={status} msg={statusMsg} />
        <div
          className={`${
            serverStatus && serverStatus?.loading && "animate-pulse"
          } flex w-full h-full flex-col justify-between gap-5 md:gap-4 mr-1`}
        >
          <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <label htmlFor="title" className="font-medium">
              Title*
            </label>
            <input
              className="border border-slate-800 w-full p-2 rounded"
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              required="required"
              disabled={serverStatus?.loading}
            />
          </span>
          <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <label htmlFor="post-content" className="font-medium">
              Post*
            </label>
            <textarea
              id="post-content"
              name="postContent"
              rows="10"
              cols="50"
              value={post.postContent}
              onChange={handleChange}
              className="border border-slate-800 w-full p-2 rounded whitespace-pre-wrap"
              disabled={serverStatus?.loading}
            ></textarea>
          </span>

          <AttachmentInput serverStatus={serverStatus} imgCdn={post.imgCdn} />
          <span className="flex self-center">
            <button
              type="submit"
              className="text-slate-50 bg-amber-800 disabled:bg-amber-800/50 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
              onClick={handleSubmit}
              disabled={serverStatus?.loading}
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
