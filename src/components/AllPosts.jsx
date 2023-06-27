import React from "react";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services";
import { Link } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortSelect, setSortSelect] = useState("");

  const loadPosts = async () => {
    const { data, error } = await getAllPosts();
    if (data) {
      setPosts(data.posts);
    } else {
      console.log(error);
    }
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
    <div className="rounded flex shadow-md border m-3 w-11/12 gap-2 backdrop-blur-xl flex-col px-3 py-5 font-[700] text-center">
      <span className="flex w-full justify-between mb-3 border-2 p-2">
        <input
          type="text"
          placeholder="Search for a post..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-1/3"
        />
        <select
          name="sort-select"
          id="sort-select"
          className="p-2"
          onChange={(e) => setSortSelect(e.target.value)}
        >
          <option value="">Sort posts...</option>
          <option value="createdAt">Time Created</option>
          <option value="upvotes">Upvotes</option>
        </select>
      </span>
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
    </div>
  );
};

export default AllPosts;
