import { useContext } from "react";
import ReplyOptions from "./ReplyOptions";
import { ReplyFormContext } from "../context/ReplyFormContext";
import ReplyForm from "./form/ReplyForm";
const Reply = ({ reply, user }) => {
  const { replyForm } = useContext(ReplyFormContext);
  return (
    <div
      className={`flex w-full mb-2 flex-col gap-10 md:gap-0 md:flex-row pl-3`}
    >
      <div
        className={`${
          replyForm.active && replyForm.mode === "edit" ? "hidden" : ""
        } w-full`}
      >
        <div
          className="prose prose-li:marker:text-slate-700 md:max-w-[80%] mr-2"
          dangerouslySetInnerHTML={{ __html: reply.postContent }}
        />
        {replyForm.active && replyForm.mode === "create" && (
          <ReplyForm original={reply} user={user} />
        )}
      </div>
      {replyForm.active && replyForm.mode === "edit" && (
        <ReplyForm original={reply} user={user} />
      )}
      <ReplyOptions user={user} reply={reply} />
    </div>
  );
};

export default Reply;
