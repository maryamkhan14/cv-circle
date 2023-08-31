import React from "react";
import { useEffect, useState, useContext } from "react";
import { usePost, usePostDeletion } from "../features/posts/hooks";
import {
  Link,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { StatusContextProvider } from "../features/notifications/context/StatusContext";
import { ReplyFormContextProvider } from "../features/replies/context/ReplyFormContext";
import PostDetails from "../features/posts/components/PostDetails";
const SinglePost = () => {
  const [user] = useOutletContext();
  const { id: postId } = useParams();

  return (
    <StatusContextProvider>
      <div className="flex items-stretch w-11/12 max-h-[90%] m-3 gap-5 p-3 rounded shadow-md border bg-slate-100/50">
        <ReplyFormContextProvider>
          <PostDetails user={user} postId={postId} />
        </ReplyFormContextProvider>
      </div>
    </StatusContextProvider>
  );
};

export default SinglePost;
