import { useContext, useState } from "react";
import { ReplyFormContext } from "../../replies/context/ReplyFormContext";
import { Link } from "react-router-dom";
import { useInteractive } from "../../../context/InteractiveContext";
import DeletePrompt from "./DeletePrompt";
const PostOptions = ({ post, user }) => {
  const interactive = useInteractive();
  const { replyForm, dispatch: replyFormDispatch } =
    useContext(ReplyFormContext);
  const [deletePromptActive, setDeletePromptActive] = useState(false);
  const handleReplyClick = () => {
    replyFormDispatch({ type: "SWITCH_REPLY_FORM_ACTIVE" });
  };
  const handleDeleteClick = () => {
    setDeletePromptActive(true);
  };

  return (
    <div className="w-full flex gap-2 items-center flex-wrap">
      {user && (
        <>
          <button
            className={`text-slate-50 disabled:opacity-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center `}
            onClick={handleReplyClick}
            disabled={replyForm.active || !interactive}
          >
            Reply
          </button>
          {user.userId == post.userId && (
            <>
              <Link to={`/edit-post/${post.id}`}>
                <button
                  className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center  h-full justify-center"
                  disabled={!interactive}
                >
                  Edit
                </button>
              </Link>

              <button
                className="text-slate-50 bg-red-500 disabled:bg-red-500/50 hover:bg-red-500/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
                onClick={handleDeleteClick}
                disabled={deletePromptActive || !interactive}
              >
                Delete
              </button>
              {deletePromptActive && (
                <DeletePrompt
                  postId={post.id}
                  cancel={() => setDeletePromptActive(false)}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PostOptions;
