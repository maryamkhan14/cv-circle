import React from "react";
import { useEffect, useContext } from "react";
import { usePostMutation } from "../../hooks";
import { Link } from "react-router-dom";
import { PostFormContext } from "../../context/PostFormContext";
import AttachmentInput from "./AttachmentInput";
import Textarea from "../../../../components/rich-textarea/Textarea";
import {
  useInteractiveDispatch,
  useInteractive,
} from "../../../../context/InteractiveContext";
import { toast } from "react-hot-toast";

const PostForm = ({ toEditId, user, postToEdit }) => {
  const { post, dispatch: postFormDispatch } = useContext(PostFormContext);
  const interactiveDispatch = useInteractiveDispatch();
  const interactive = useInteractive();
  const { status: postStatus, mutateAsync: submit } = usePostMutation(toEditId);
  useEffect(() => {
    if (user) {
      postFormDispatch({
        type: "UPDATE_POST",
        payload: { ...post, userId: user.userId },
      });
    }
  }, [user]);

  useEffect(() => {
    if (postToEdit) {
      postFormDispatch({
        type: "UPDATE_POST",
        payload: postToEdit,
      });
    }
  }, [postToEdit]);

  useEffect(() => {
    if (postStatus !== "idle")
      interactiveDispatch({ type: "UPDATE_INTERACTIVE", payload: postStatus });
  }, [postStatus]);

  const handleChange = (e, keyOverride, valueOverride) => {
    let key = keyOverride !== undefined ? keyOverride : e.target.name;
    let value = valueOverride !== undefined ? valueOverride : e.target.value;
    postFormDispatch({
      type: "UPDATE_POST",
      payload: {
        ...post,
        [key]: value,
      },
    });
  };

  const validate = () => {
    toast.dismiss();
    if (!post.title?.trim()) {
      toast.error("Please enter a title.");
      return false;
    }
    if (!post.postContent?.trim()) {
      toast.error("Please add content to your post.");
      return false;
    }
    if (!toEditId && !post.file) {
      toast.error("Please attach a file.");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      toast.promise(submit({ ...post, id: toEditId }), {
        loading: "Preparing your post.",
        success: ({ posted, updated }) => {
          let id = posted?.id ?? updated?.id;
          return (
            <p>
              Success! Click
              <Link
                className="text-blue-800 hover:text-blue-700 hover:underline-offset-4 font-medium underline underline-offset-2 decoration-1 decoration-dotted p-1"
                to={`/post/${id}`}
              >
                here
              </Link>
              to view your {!!updated ? "updated" : "new"} post.
            </p>
          );
        },
        error: (error) => error.message,
      });
    }
  };

  return (
    <div className="flex items-stretch w-[90%] min-h-[90%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
      <form className="rounded flex flex-col justify-between gap-5 p-3 min-h-full w-full">
        <h1 className="text-4xl font-semibold text-slate-900">
          {toEditId ? "Edit your post" : "Create a post"}
        </h1>
        <p>
          All fields are required. We support .png, .jpg, .jpeg, and .pdf
          formats for resumes.
        </p>
        <div
          className={`${
            postStatus === "loading" && "animate-pulse"
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
              disabled={!interactive}
            />
          </span>
          <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <label htmlFor="post-content" className="font-medium">
              Post*
            </label>
            <div className="rounded border border-slate-800 flex w-full  flex-col">
              <Textarea
                onChange={(content) =>
                  handleChange(null, "postContent", content)
                }
                initialContent={postToEdit?.postContent}
              />
            </div>
          </span>

          <AttachmentInput imgCdn={post.imgCdn} />
          <span className="flex self-center">
            <button
              type="submit"
              className="text-slate-50 bg-amber-800 disabled:bg-amber-800/50 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
              onClick={handleSubmit}
              disabled={!interactive}
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
