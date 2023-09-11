import React, { Suspense, lazy } from "react";
import { PostsListContextProvider } from "../features/posts/context/PostsListContext";
const PostsList = lazy(() =>
  import("../features/posts/components/list/PostsList")
);
const SearchBar = lazy(() =>
  import("../features/posts/components/list/SearchBar")
);
const SortSelect = lazy(() =>
  import("../features/posts/components/list/SortSelect")
);

import useAllPosts from "../features/posts/hooks/useAllPosts";
import PostsSkeleton from "../features/posts/components/PostsSkeleton";
import LoadingSvg from "../assets/LoadingSvg";
const AllPosts = () => {
  const { status: allPostsStatus, error, data: allPosts } = useAllPosts();
  return (
    <PostsListContextProvider>
      <div className="rounded flex shadow-md border m-3 w-11/12 gap-2 bg-slate-100/50 flex-col px-3 py-5 font-[700] text-center">
        <Suspense
          fallback={
            <div className="w-10 h-10 self-center">
              <LoadingSvg />
            </div>
          }
        >
          <span className="flex w-full justify-between mb-3 border-2 p-2">
            <SearchBar />
            <SortSelect />
          </span>
        </Suspense>
        <Suspense fallback={<PostsSkeleton />}>
          <PostsList
            status={allPostsStatus}
            error={error}
            posts={allPosts}
            loader={<PostsSkeleton />}
          />
        </Suspense>
      </div>
    </PostsListContextProvider>
  );
};

export default AllPosts;
