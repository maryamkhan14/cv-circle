import Textarea from "../../../../components/rich-textarea/Textarea";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReplyFormContext } from "../../context/ReplyFormContext";
import ReplyFormOptions from "./ReplyFormOptions";
const ReplyForm = ({ original, user }) => {
  const { replyForm } = useContext(ReplyFormContext);
  const defaults = {
    createdAt: "",
    id: "",
    imgCdn: "",
    postContent: "",
    title: "",
    userId: user?.userId || "",
    file: null,
    path: original.path || "",
    replies: original.replies,
    isReply: true,
  };
  const [post, setPost] = useState({
    ...defaults,
  });

  const clear = () => {
    setPost({ ...defaults });
  };

  // automatically populate fields if editing existing post
  useEffect(() => {
    if (replyForm.mode == "edit") {
      setPost({ ...original });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full">
      <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
        <label htmlFor="post-content" className="hidden">
          Reply
        </label>
        {/*<textarea
          id="post-content"
          name="postContent"
          rows="4"
          cols="50"
          value={post.postContent}
          onChange={(e) => setPost({ ...post, postContent: e.target.value })}
          className="border border-slate-800 w-full p-2 rounded whitespace-pre-wrap"
        ></textarea>*/}

        <div className="rounded border border-slate-800 flex w-full  flex-col">
          <Textarea
            onChange={(content) => setPost({ ...post, postContent: content })}
            initialContent={original?.postContent}
          />
        </div>
        <ReplyFormOptions clear={clear} post={post} />
      </span>
    </div>
  );
};

export default ReplyForm;
