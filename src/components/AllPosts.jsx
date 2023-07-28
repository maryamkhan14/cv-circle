import React from "react";
import { useEffect, useState } from "react";
import { getAllPosts } from "../services";
import SearchBar from "./SearchBar";
import PostsList from "./PostsList";
import PostsSkeleton from "./PostsSkeleton";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [sortSelect, setSortSelect] = useState("createdAt");
  const onSearchSubmit = (term) => {
    setPosts([
      ...allPosts.filter((post) =>
        post.title.toLowerCase().includes(term.toLowerCase())
      ),
    ]);
  };
  const clearResults = () => {
    if (allPosts.length) {
      setPosts([...allPosts]);
    }
  };
  const loadPosts = async () => {
    const { data, error } = await getAllPosts();
    if (data) {
      setAllPosts(sortPosts(data.posts));
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    loadPosts();
  }, []);
  useEffect(() => {
    if (allPosts.length > 0) {
      clearResults();
    }
  }, [allPosts]);

  const sortPosts = (displayed) => {
    switch (sortSelect) {
      case "createdAt":
        return [
          ...displayed.sort(
            (a, b) => new Date(b[sortSelect]) - new Date(a[sortSelect])
          ),
        ];
      case "upvoteCount":
        return [...displayed.sort((a, b) => b[sortSelect] - a[sortSelect])];
      default:
        return [...displayed.sort((a, b) => b[sortSelect] - a[sortSelect])];
    }
  };
  useEffect(() => {
    setPosts(sortPosts(posts));
  }, [sortSelect]);
  return (
    <div className="rounded flex shadow-md border m-3 w-11/12 gap-2 bg-slate-100/50 flex-col px-3 py-5 font-[700] text-center">
      <span className="flex w-full justify-between mb-3 border-2 p-2">
        <SearchBar
          onSearchSubmit={onSearchSubmit}
          clearResults={clearResults}
        />
        <span className="flex items-center gap-3 p-1 border border-slate-400 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>

          <select
            name="sort-select"
            id="sort-select"
            className="p-2 bg-white rounded"
            onChange={(e) => setSortSelect(e.target.value)}
          >
            <option value="createdAt">Time Created</option>
            <option value="upvoteCount">Upvotes</option>
          </select>
        </span>
      </span>
      {allPosts && allPosts.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <PostsSkeleton />
      )}
    </div>
  );
};

export default AllPosts;
