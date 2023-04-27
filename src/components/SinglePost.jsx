import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { supabase } from "../client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const getPost = async () => {
    const { data, errors } = await supabase.from("posts").select().eq("id", id);
    if (errors) {
      return null;
    } else {
      return data;
    }
  };
  const increaseUpvotes = async () => {
    if (Object.keys(user).length > 0) {
      const { data: upvotedPost, errors } = await supabase
        .from("posts")
        .update({ upvotes: post.upvotes + 1 })
        .eq("id", id)
        .select();

      setPost(...upvotedPost);
    }
  };

  useEffect(() => {
    getPost().then((result) => setPost(...result));
  }, []);
  return (
    <div className="flex items-stretch w-11/12 min-h-[90%] m-3 gap-5 p-3 rounded shadow-md border backdrop-blur-xl">
      <div className="rounded flex flex-col gap-5 p-3 min-h-full w-full">
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
                className="w-full md:w-2/5 lg:w-1/3"
              />
            </Link>
            <p className="italic">
              Note: To see the image in full size, click it.
            </p>

            <span
              className={`${
                Object.keys(user).length > 0 && "hover:cursor-pointer"
              } flex gap-2 border p-3 w-full md:w-auto md:min-w-[15%] md:max-w-[20%] rounded-full bg-amber-800/70 justify-center items-center`}
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
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
