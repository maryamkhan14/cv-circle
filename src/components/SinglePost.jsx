import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getPost, upvotePost } from "../services";
import { supabase } from "../client";
import { Link, useParams, useNavigate } from "react-router-dom";

const SinglePost = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const { error, setError } = useState(null);
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const increaseUpvotes = async () => {
    if (Object.keys(user).length > 0) {
      //TODO: Add error handling
      const { data: newUpvotes, err } = await upvotePost(id, {
        upvotes: post.upvotes,
      });

      if (newUpvotes) {
        //TODO: add upvotes to table so user can tell which posts they've upvoted
        setPost({ ...post, ...newUpvotes[0] });
      } else {
        setError({ category: "upvote", msg: "Upvoting failed." });
      }
    }
  };

  const deletePost = async () => {
    const { data, errors } = await supabase.from("posts").delete().eq("id", id);
    if (errors) {
      console.log(errors);
    } else {
      console.log(data);
    }
    navigate("/");
  };

  useEffect(() => {
    getPost(id).then(({ data, err }) => {
      if (data) {
        setPost(...data);
      } else {
        // TODO: navigate to 404 page
      }
    });
  }, []);
  return (
    <div className="flex items-stretch w-11/12 min-h-[90%] m-3 gap-5 p-3 rounded shadow-md border backdrop-blur-xl">
      <div className="rounded flex flex-col gap-5 p-3 max-h-full w-full">
        {post && (
          <>
            <h1 className="text-4xl font-semibold text-slate-900">
              {post.title}
            </h1>
            <p className="text-xl"> {post["post_content"]}</p>
            <Link
              to={post["img_cdn"]}
              className="hover:cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={post["img_cdn"]}
                referrerPolicy="no-referrer"
                className="border-blue border max-w-[5%]"
              />
            </Link>
            <p className="italic">
              Note: To see the image in full size, click it.
            </p>

            <div className="w-full flex gap-2 items-stretch">
              <span
                className={`${
                  Object.keys(user).length > 0 && "hover:cursor-pointer"
                } flex gap-2 border p-3 md:w-auto md:min-w-[15%] md:max-w-[20%] h-full rounded-lg bg-amber-800 justify-center items-center`}
                onClick={increaseUpvotes}
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

                <p className="text-slate-50">{post && post.upvotes} upvotes</p>
              </span>
              {Object.keys(user).length > 0 && user.id == post["fk_uid"] && (
                <>
                  <Link to={`/edit-post/${id}`}>
                    <button className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center  h-full justify-center">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="text-slate-50 bg-red-500 hover:bg-red-500/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
                    onClick={deletePost}
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
