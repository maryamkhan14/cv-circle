import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getPost, deletePost } from "../services";
import { Link, useParams, useNavigate } from "react-router-dom";
import VoteDisplay from "./VoteDisplay";
import PostSkeleton from "./PostSkeleton";
import ReplyList from "./ReplyList";
import ReplyForm from "./ReplyForm";

const SinglePost = () => {
  const { user } = useContext(UserContext);
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [postLoaded, setPostLoaded] = useState(false);
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyFormActive, setReplyFormActive] = useState(false);
  const handleDeleteClick = async () => {
    // TODO: add confirmation dialog
    const { data, error } = await deletePost(postId);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }
    navigate("/");
  };

  useEffect(() => {
    getPost(postId).then(({ data, error }) => {
      if (data) {
        let { post } = data;
        setPost(post);
        setReplies(post.replies);
        setPostLoaded(true);
      } else {
        // TODO: navigate to 404 page
      }
    });
  }, []);

  return (
    <div className="flex items-stretch w-11/12 max-h-[90%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
      <div className="rounded flex flex-col gap-5 p-3 max-h-full w-full">
        {postLoaded ? (
          <>
            <span className="flex flex-col md:gap-10 ">
              <span className="flex flex-col md:flex-row gap-5 pb-3 border-b border-slate-300 items-center">
                <VoteDisplay
                  postId={post.id}
                  existingUpvoteCount={post.upvoteCount}
                  upvoters={post.upvoters}
                  downvoters={post.downvoters}
                />
                <h1 className="text-4xl font-semibold text-slate-900">
                  {post.title}
                </h1>
              </span>

              <span className="flex flex-col pt-3 md:pt-0 md:flex-row gap-3 justify-between">
                <p
                  className="text-lg flex-1 break-words hyphens-auto pr-5"
                  lang="en"
                >
                  {" "}
                  {post.postContent}
                </p>

                <span className="flex flex-col pl-5 md:w-[25%] justify-center self-center">
                  <Link
                    to={post.imgCdn}
                    className="hover:cursor-pointer w-full flex justify-center md:justify-end"
                    target="_blank"
                    aria-label="View image in full size"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={post.imgCdn}
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
              {Object.keys(user).length > 0 && user.userId == post.userId && (
                <>
                  <button
                    className={`text-slate-50 disabled:opacity-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center `}
                    onClick={(e) => setReplyFormActive(true)}
                    disabled={replyFormActive}
                  >
                    Reply
                  </button>
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
            </div>
            {replyFormActive && (
              <ReplyForm
                original={post}
                mode="create"
                setReplyFormActive={setReplyFormActive}
              />
            )}
            <ReplyList replies={post.replies} />
          </>
        ) : (
          <PostSkeleton />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
