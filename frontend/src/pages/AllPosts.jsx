import React from "react";
import { PostsListContextProvider } from "../features/posts/context/PostsListContext";
import { StatusContextProvider } from "../features/notifications/context/StatusContext";
import PostsList from "../features/posts/components/list/PostsList";
import PostsSkeleton from "../features/posts/components/PostsSkeleton";
import StatusNotification from "../features/notifications/components/StatusNotification";
import useAllPosts from "../features/posts/hooks/useAllPosts";
import SearchBar from "../features/posts/components/list/SearchBar";
import SortSelect from "../features/posts/components/list/SortSelect";
const AllPosts = () => {
  const { isLoading, isError, data: allPosts, error } = useAllPosts();
  return (
    <StatusContextProvider>
      <PostsListContextProvider>
        <div className="rounded flex shadow-md border m-3 w-11/12 gap-2 bg-slate-100/50 flex-col px-3 py-5 font-[700] text-center">
          <span className="flex w-full justify-between mb-3 border-2 p-2">
            <SearchBar />
            <SortSelect />
          </span>
          {isLoading ? (
            <PostsSkeleton />
          ) : isError ? (
            <StatusNotification status={"error"} msg={error.message} />
          ) : (
            <PostsList allPosts={allPosts} />
          )}
        </div>
      </PostsListContextProvider>
    </StatusContextProvider>
  );
};

export default AllPosts;
