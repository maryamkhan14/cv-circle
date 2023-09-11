import React, { useContext, useEffect } from "react";
import { ReplyFormContext } from "../../replies/context/ReplyFormContext";
import { usePostDeletion } from "../hooks";
import { Link } from "react-router-dom";
import { useInteractiveDispatch } from "../../../context/InteractiveContext";
const PostOptions = ({ post, user }) => {
  const interactiveDispatch = useInteractiveDispatch();
  const { replyForm, dispatch: replyFormDispatch } =
    useContext(ReplyFormContext);
  let postId = post?.id;
  let { status, mutateAsync: remove } = usePostDeletion(postId);
  const handleReplyClick = () => {
    replyFormDispatch({ type: "SWITCH_REPLY_FORM_ACTIVE" });
  };
  const handleDeleteClick = () => {
    toast.promise(remove(postId), {
      loading: "Post is being deleted.",
      success: "Post has been deleted. Feel free to navigate away.",
      error: (error) => error.message,
    });
  };
  useEffect(() => {
    if (status !== "idle")
      interactiveDispatch({ type: "UPDATE_INTERACTIVE", payload: status });
  }, [status]);

  return (
    <div className="w-full flex gap-2 items-stretch">
      {user && (
        <>
          <button
            className={`text-slate-50 disabled:opacity-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center `}
            onClick={handleReplyClick}
            disabled={replyForm.active || status === "loading"}
          >
            Reply
          </button>
          {user.userId == post.userId && (
            <>
              <Link to={`/edit-post/${post.id}`}>
                <button
                  className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center  h-full justify-center"
                  disabled={status === "loading"}
                >
                  Edit
                </button>
              </Link>

              <button
                className="text-slate-50 bg-red-500 hover:bg-red-500/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
                onClick={handleDeleteClick}
                disabled={status === "loading"}
              >
                Delete
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostOptions;
