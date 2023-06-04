import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getPost, upvotePost, checkHasUpvoted, deletePost } from "../services";
import { Link, useParams, useNavigate } from "react-router-dom";

const SinglePost = () => {
  const { user } = useContext(UserContext);
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [upvoted, setHasUpvoted] = useState(false);

  const handleUpvoteClick = async () => {
    if (Object.keys(user).length > 0) {
      //TODO: Add error handling
      const { data: newUpvotes, error } = await upvotePost(postId, {
        userId: user.id,
      });
      if (newUpvotes) {
        setPost({ ...post, upvoteCount: newUpvotes });
        setUpvotedStatus(true);
      } else {
        console.log(error);
        setError({ category: "upvote", msg: "Upvoting failed." });
      }
    }
  };

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
        let {
          id,
          created_at: createdAt,
          fk_uid: fkUid,
          title,
          post_content: postContent,
          img_cdn: imgCdn,
          upvote_count: upvoteCount,
        } = data[0];
        setPost({
          id,
          createdAt,
          fkUid,
          title,
          postContent,
          imgCdn,
          upvoteCount,
        });
      } else {
        // TODO: navigate to 404 page
      }
    });
  }, []);

  const setUpvotedStatus = async () => {
    //TODO: Improve by implementing stored function that returns join of upvotes and posts
    const { data, error } = await checkHasUpvoted(postId, {
      userId: user.id,
    });
    if (data) {
      setHasUpvoted(data.length && Object.keys(...data).length ? true : false);
    } else {
      //TODO: handle error
      console.log(error);
    }
  };

  useEffect(() => {
    if (post && Object.keys(post).length && Object.keys(user).length) {
      setUpvotedStatus();
    }
  }, [post.id]);
  return (
    <div className="flex items-stretch w-11/12 max-h-[90%] m-3 gap-5 p-3 rounded shadow-md border backdrop-blur-xl">
      <div className="rounded flex flex-col gap-5 p-3 max-h-full w-full">
        {post && (
          <>
            <h1 className="text-4xl font-semibold text-slate-900">
              {post.title}
            </h1>
            <span className="flex flex-col md:flex-row md:gap-10">
              <span className="flex w-full md:w-[70%] flex-col">
                <p className="text-xl break-words hyphens-auto" lang="en">
                  {" "}
                  {post.postContent}
                </p>
              </span>
              <span className="flex flex-col w-[90%] md:w-[30%] self-center">
                <Link
                  to={post.imgCdn}
                  className="hover:cursor-pointer w-full flex justify-center md:justify-end"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={post.imgCdn}
                    referrerPolicy="no-referrer"
                    className="border-blue border rounded-lg object-contain"
                  />
                </Link>
                <p className="italic self-center">
                  Note: To see the image in full size, click it.
                </p>
              </span>
            </span>

            <div className="w-full flex gap-2 items-stretch">
              <span
                className={`${
                  Object.keys(user).length > 0 && "hover:cursor-pointer"
                } flex gap-2 border p-3 md:w-auto md:min-w-[15%] md:max-w-[20%] h-full rounded-lg ${
                  upvoted ? "bg-amber-500" : "bg-amber-800"
                } justify-center items-center`}
                onClick={handleUpvoteClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="w-6 h-6 stroke-slate-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="text-slate-50">
                  {post && post.upvoteCount} upvotes
                </p>
              </span>
              {console.log(user.id, post.fkUid)}
              {Object.keys(user).length > 0 && user.id == post.fkUid && (
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
