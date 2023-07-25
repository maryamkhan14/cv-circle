import { useState, useEffect } from "react";
const PostsSkeleton = ({ counts = 10 }) => {
  const [skeletons, setSkeletons] = useState([]);

  useEffect(() => {
    const newSkeletons = [];
    for (let i = 0; i < counts; i++) {
      newSkeletons.push(
        <div className="animate-pulse" key={i}>
          <div className="flex flex-row w-full border-2 bg-gray-200 p-3">
            <div className="flex flex-col md:flex-row w-full items-center justify-between">
              <span className="flex flex-col border p-3 rounded-full bg-gray-300 justify-center items-center w-12 h-12"></span>
              <span className="h-4/5 rounded w-[40%] bg-gray-300"></span>
              <span className="h-4/5 rounded w-[25%] bg-gray-300"></span>
            </div>
          </div>
        </div>
      );
    }
    setSkeletons((prevSkeletons) => [...prevSkeletons, ...newSkeletons]);
  }, []);
  return <>{skeletons}</>;
};

export default PostsSkeleton;
