import React from "react";
import { useEffect, useState } from "react";
import { usePost, usePostDeletion } from "../features/posts/hooks";
import {
  Link,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import VoteDisplay from "../features/votes/components/VoteDisplay";
import PostSkeleton from "../features/posts/components/PostSkeleton";
import ReplyList from "../features/replies/components/ReplyList";
import ReplyForm from "../features/replies/components/form/ReplyForm";
import StatusNotification from "../components/status-update/StatusNotification";

const SinglePost = () => {
  const [user] = useOutletContext();
  const [statusMsg, setStatusMsg] = useState("");
  const { id: postId, updated } = useParams();
  let postStatus, post, error;
  let deleteStatus, remove;
  ({ status: postStatus, data: post, error } = usePost(postId));
  const navigate = useNavigate();
  const [replyFormActive, setReplyFormActive] = useState(false);
  ({
    status: deleteStatus,
    error,
    mutateAsync: remove,
  } = usePostDeletion(postId));
  const handleDeleteClick = () => {
    // TODO: add confirmation dialog
    setStatusMsg("Deleting post.");
    remove(postId);
  };
  useEffect(() => {
    if (deleteStatus === "loading") {
      setStatusMsg("Post is being deleted.");
    } else if (deleteStatus === "success") {
      setStatusMsg("Post has been deleted!");
    }
  }, [deleteStatus]);

  return (
    <div className="flex items-stretch w-11/12 max-h-[90%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
      <div className="rounded flex flex-col gap-5 p-3 max-h-full w-full">
        {error ? (
          <StatusNotification status={"error"} msg={error.message} />
        ) : (
          <StatusNotification status={deleteStatus} msg={statusMsg} />
        )}

        {postStatus === "loading" || deleteStatus === "loading" ? (
          <PostSkeleton />
        ) : (
          post && (
            <>
              <span className="flex flex-col md:gap-10 ">
                <span className="flex flex-col md:flex-row gap-5 pb-3 border-b border-slate-300 items-center">
                  <VoteDisplay
                    postId={post.id}
                    existingUpvoteCount={post.upvoteCount}
                  />
                  <h1 className="text-4xl font-semibold text-slate-900">
                    {post.title}
                  </h1>
                </span>
                <span className="flex flex-col pt-3 md:pt-0 md:flex-row gap-3 justify-between">
                  <p
                    className="text-lg flex-1 break-words whitespace-pre-wrap pr-5"
                    lang="en"
                  >
                    {post.postContent}
                  </p>

                  <span className="flex flex-col pl-5 md:w-[25%] justify-center self-center">
                    <Link
                      to={
                        updated ? post.imgCdn + "?t=" + Date.now() : post.imgCdn
                      }
                      className="hover:cursor-pointer w-full flex justify-center md:justify-end"
                      target="_blank"
                      aria-label="View image in full size"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={
                          updated
                            ? post.imgCdn + "?t=" + Date.now()
                            : post.imgCdn
                        }
                        referrerPolicy="no-referrer"
                        alt="Post image"
                        className="border-blue border rounded-lg object-contain"
                      />
                    </Link>
                    <p className="italic self-center">
                      Note: To see the image in full size, click it.
                    </p>
                  </span>
                </span>
              </span>

              <div className="w-full flex gap-2 items-stretch">
                {user && (
                  <>
                    <button
                      className={`text-slate-50 disabled:opacity-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center `}
                      onClick={(e) => setReplyFormActive(true)}
                      disabled={replyFormActive}
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
              {replyFormActive && (
                <ReplyForm
                  original={post}
                  mode="create"
                  setReplyFormActive={setReplyFormActive}
                />
              )}
              <ReplyList replies={post?.replies} user={user} />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SinglePost;
