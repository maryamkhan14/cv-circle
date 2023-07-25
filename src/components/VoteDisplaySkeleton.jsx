import React from "react";

const VoteDisplaySkeleton = () => {
  return (
    <div className="flex flex-col max-w-auto gap-2 justify-center items-center">
      <span className="border p-3 rounded-full bg-gray-300 w-10 h-10"></span>
      <span className="h-5 rounded w-[90%] bg-gray-300"></span>
      <span className="border p-3 rounded-full bg-gray-300 w-10 h-10"></span>
    </div>
  );
};

export default VoteDisplaySkeleton;
