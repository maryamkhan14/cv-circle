import React from "react";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services";
import { Link } from "react-router-dom";
import PostsList from "./PostsList";
import PostsSkeleton from "./PostsSkeleton";
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
    <div className="rounded flex shadow-md border m-3 w-11/12 gap-2 bg-slate-100/50 flex-col px-3 py-5 font-[700] text-center">
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
        <PostsList postsList={posts} />
      ) : (
        <PostsSkeleton />
      )}
    </div>
  );
};

export default AllPosts;
