import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostsList = ({ postsList, searchFilter, sortFilter }) => {
  const [posts, setPosts] = useState(postsList);
  const [search, setSearch] = useState("");
  const [sortSelect, setSortSelect] = useState("");

  const loadPosts = async () => {
    setPosts(postsList);
  };
  useEffect(() => {
    if (search != "") {
      setPosts(posts.filter((post) => post.title.includes(search)));
    } else {
      loadPosts();
    }
  }, [search]);

  useEffect(() => {
    if (sortSelect != "") {
      console.log(sortSelect);
      setPosts(
        posts.sort((a, b) =>
          a[sortSelect] > b[sortSelect]
            ? 1
            : b[sortSelect] > a[sortSelect]
            ? -1
            : 0
        )
      );
    }
  }, [sortSelect]);
  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            className="flex flex-row w-full border-2 bg-slate-50/80 p-3"
            key={post && post.id}
          >
            <Link
              to={`/post/${post && post.id}`}
              className="flex flex-col md:flex-row w-full items-center justify-between"
            >
              <span className="flex flex-col border p-3 rounded-full bg-amber-800/70 justify-center items-center">
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

                <p className="text-slate-50">{post && post.upvoteCount}</p>
              </span>
              <h2 className="text-4xl truncate text-ellipsis max-w-[45%]">
                {post && post.title}
              </h2>
              <p className="font-light italic">{post && post.createdAt}</p>
            </Link>
          </div>
        ))
      ) : (
        <h2 className="text-2xl m-3">No posts yet!</h2>
      )}
    </>
  );
};

export default PostsList;
