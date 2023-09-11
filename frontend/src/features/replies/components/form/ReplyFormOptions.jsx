import { toast } from "react-hot-toast";
import { ReplyFormContext } from "../../context/ReplyFormContext";
import { useContext, useEffect } from "react";
import { useReplyMutation } from "../../hooks";
import { useNavigate } from "react-router-dom";
import {
  useInteractive,
  useInteractiveDispatch,
} from "../../../../context/InteractiveContext";
const ReplyFormOptions = ({ clear, post }) => {
  const { dispatch: replyFormDispatch } = useContext(ReplyFormContext);
  const interactive = useInteractive();
  const interactiveDispatch = useInteractiveDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    status: replyStatus,
    mutateAsync: submit,
  } = useReplyMutation(post.id);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(submit(post), {
      loading: "Reply is being saved.",
      success: "Reply has been posted.",
      error: (error) => error.message,
    });
  };
  const close = () => {
    clear();
    replyFormDispatch({ type: "SWITCH_REPLY_FORM_ACTIVE" });
  };
  useEffect(() => {
    replyFormDispatch({
      type: "SWITCH_REPLY_FORM_LOADING",
      payload: isLoading,
    });
  }, [isLoading]);

  useEffect(() => {
    if (replyStatus !== "idle")
      interactiveDispatch({ type: "UPDATE_INTERACTIVE", payload: replyStatus });
    if (replyStatus === "success") {
      navigate(".", { relative: "path" }); // force re-render
      close();
    }
  }, [replyStatus]);
  return (
    <>
      <span className="flex flex-row md:flex-col justify-center gap-3 m-3">
        <button
          type="submit"
          aria-label="Submit"
          className="text-slate-50 text-xs bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
          onClick={handleSubmit}
          disabled={!interactive || replyStatus === "loading"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4  self-center flex items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>

        <button
          type="submit"
          aria-label="Cancel edit"
          className="text-slate-50 text-xs bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center"
          onClick={close}
          disabled={!interactive || replyStatus === "loading"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4  self-center flex items-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>
    </>
  );
};

export default ReplyFormOptions;
