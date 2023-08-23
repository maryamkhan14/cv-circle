import React, { useContext, useEffect } from "react";
import { ReplyFormContext } from "../../replies/context/ReplyFormContext";
import { StatusContext } from "../../notifications/context/StatusContext";
import { usePostDeletion } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
const PostOptions = ({ post, user }) => {
  const { dispatch: statusDispatch } = useContext(StatusContext);
  const { replyForm, dispatch: replyFormDispatch } =
    useContext(ReplyFormContext);
  let postId = post?.id;
  let {
    status: deleteStatus,
    error,
    mutateAsync: remove,
  } = usePostDeletion(postId);
  const handleReplyClick = () => {
    replyFormDispatch({ type: "SWITCH_REPLY_FORM_ACTIVE" });
  };
  const handleDeleteClick = () => {
    // TODO: add confirmation dialog
    statusDispatch({
      type: "UPDATE_STATUS",
      payload: {
        status: "loading",
        statusMsg: "Starting post deletion process.",
      },
    });
    remove(postId);
  };
  useEffect(() => {
    if (deleteStatus === "loading") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "loading",
          statusMsg: "Post is being deleted.",
        },
      });
    } else if (deleteStatus === "success") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "success",
          statusMsg: "Post has been deleted. Feel free to navigate away.",
        },
      });
    }
  }, [deleteStatus]);
  useEffect(() => {
    if (error) {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "error",
          statusMsg: error.message,
        },
      });
    }
  }, [error]);

  return (
    <div className="w-full flex gap-2 items-stretch">
      {user && (
        <>
          <button
            className={`text-slate-50 disabled:opacity-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center `}
            onClick={handleReplyClick}
            disabled={replyForm.active}
          >
            Reply
          </button>
          {user.userId == post.userId && (
            <>
              <Link to={`/edit-post/${post.id}`}>
                <button className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center  h-full justify-center">
                  Edit
                </button>
              </Link>

              <button
                className="text-slate-50 bg-red-500 hover:bg-red-500/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
                onClick={handleDeleteClick}
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
