import React from "react";
import { PostsListContextProvider } from "../features/posts/context/PostsListContext";
import { StatusContextProvider } from "../features/notifications/context/StatusContext";
import PostsList from "../features/posts/components/list/PostsList";
import StatusNotification from "../features/notifications/components/StatusNotification";
import SearchBar from "../features/posts/components/list/SearchBar";
import SortSelect from "../features/posts/components/list/SortSelect";
const AllPosts = () => {
  return (
    <StatusContextProvider>
      <PostsListContextProvider>
        <div className="rounded flex shadow-md border m-3 w-11/12 gap-2 bg-slate-100/50 flex-col px-3 py-5 font-[700] text-center">
          <span className="flex w-full justify-between mb-3 border-2 p-2">
            <SearchBar />
            <SortSelect />
          </span>
          <PostsList />
          <StatusNotification popup={"true"} />
        </div>
      </PostsListContextProvider>
    </StatusContextProvider>
  );
};

export default AllPosts;
