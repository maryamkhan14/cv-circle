import React, { lazy, Suspense, useEffect, useContext } from "react";
import { StatusContext } from "../../notifications/context/StatusContext";
import { ReplyFormContext } from "../../replies/context/ReplyFormContext";
import { usePost } from "../hooks";
import { Link } from "react-router-dom";
import PostOptions from "./PostOptions";
import ReplyForm from "../../replies/components/form/ReplyForm";
import StatusNotification from "../../notifications/components/StatusNotification";
import PostSkeleton from "./PostSkeleton";
import LoadingSvg from "../../../assets/LoadingSvg";
const VoteDisplay = lazy(() => import("../../votes/components/VoteDisplay"));
const ReplyList = lazy(() => import("../../replies/components/ReplyList"));
const PostAuthor = lazy(() => import("./PostAuthor"));
const PostDetails = ({ postId, updated, user }) => {
  let { status: postStatus, data: post, error } = usePost(postId);
  const { replyForm } = useContext(ReplyFormContext);
  const { dispatch } = useContext(StatusContext);
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
  }, [postStatus]);
  return (
    <div className="rounded flex flex-col gap-5 p-3 max-h-full w-full">
      <StatusNotification popup={"true"} />

      {postStatus === "loading" ? (
        <PostSkeleton />
      ) : (
        post && (
          <>
            <span className="flex flex-col md:gap-5 ">
              <span className="flex flex-wrap md:flex-nowrap gap-5 pb-3 border-b border-slate-300 items-center w-full h-full justify-between">
                <Suspense
                  fallback={
                    <div className="w-8 h-8">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <VoteDisplay
                    postId={post.id}
                    existingUpvoteCount={post.upvoteCount}
                  />
                </Suspense>
                <h1 className="text-4xl font-semibold text-slate-900 order-2 w-full md:grow md:order-none">
                  {post.title}
                </h1>
                <Suspense
                  fallback={
                    <div className="w-16 h-16">
                      <LoadingSvg />
                    </div>
                  }
                >
                  <PostAuthor authorId={post.userId} currentUser={user} />
                </Suspense>
              </span>
              <span className="flex flex-col pt-3 md:pt-0 md:flex-row gap-3 justify-between">
                <div
                  className="prose prose-li:marker:text-slate-700 md:max-w-[80%] mr-2"
                  dangerouslySetInnerHTML={{ __html: post.postContent }}
                />

                <span className="flex flex-col md:pl-5 md:w-[25%] justify-center self-center">
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
                        updated ? post.imgCdn + "?t=" + Date.now() : post.imgCdn
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
            <PostOptions post={post} user={user} />
            {replyForm.active && <ReplyForm original={post} user={user} />}
            <Suspense
              fallback={
                <div className="self-center w-12 h-12">
                  <LoadingSvg />
                </div>
              }
            >
              <ReplyList
                replies={post?.replies}
                user={user}
                originalAuthorId={post.userId}
              />
            </Suspense>
          </>
        )
      )}
    </div>
  );
};

export default PostDetails;
