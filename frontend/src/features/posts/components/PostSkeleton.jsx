import React from "react";
import VoteDisplaySkeleton from "../../votes/components/VoteDisplaySkeleton";
const PostSkeleton = () => {
  return (
    <>
      <span className="flex flex-col md:gap-10 ">
        <span className="flex flex-col md:flex-row gap-5 pb-3 border-b border-slate-300 items-center">
          <VoteDisplaySkeleton />
          <span className="h-5 rounded w-[70%] bg-gray-300"></span>
        </span>

        <span className="flex flex-col pt-3 md:pt-0 md:flex-row gap-3 justify-between">
          <span className=" w-full flex flex-col gap-5">
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
          </span>

          <span className="flex flex-col h-full pl-5 md:w-[25%] justify-center self-center">
            <span className="h-full rounded w-[90%] bg-gray-300 mb-5"></span>
            <span className="h-5 rounded w-[90%] bg-gray-300"></span>
          </span>
        </span>
      </span>

      <div className="w-full flex gap-2 items-stretch"></div>
    </>
  );
};

export default PostSkeleton;
