import React, { Suspense, lazy } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { ReplyFormContextProvider } from "../features/replies/context/ReplyFormContext";
import { InteractiveContextProvider } from "../context/InteractiveContext";
import PostSkeleton from "../features/posts/components/PostSkeleton";
const PostDetails = lazy(() =>
  import("../features/posts/components/PostDetails")
);
const SinglePost = () => {
  const [user] = useOutletContext();
  const { id: postId } = useParams();

  return (
    <InteractiveContextProvider>
      <div className="flex items-stretch w-11/12 max-h-[90%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
        <ReplyFormContextProvider>
          <Suspense
            fallback={
              <div className="w-full h-full">
                <PostSkeleton />
              </div>
            }
          >
            <PostDetails user={user} postId={postId} />
          </Suspense>
        </ReplyFormContextProvider>
      </div>
    </InteractiveContextProvider>
  );
};

export default SinglePost;
