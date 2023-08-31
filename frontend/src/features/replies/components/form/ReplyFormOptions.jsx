import { ReplyFormContext } from "../../context/ReplyFormContext";
import { useContext, useEffect } from "react";
import { useReplyMutation } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { StatusContext } from "../../../notifications/context/StatusContext";
const ReplyFormOptions = ({ clear, post }) => {
  const { replyForm, dispatch: replyFormDispatch } =
    useContext(ReplyFormContext);
  const { status, dispatch: statusDispatch } = useContext(StatusContext);
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    error,
    status: replyStatus,
    mutateAsync: submit,
  } = useReplyMutation(post.id);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(replyForm.mode);
    submit(post);
  };
  const close = () => {
    clear();
    replyFormDispatch({ type: "SWITCH_REPLY_FORM_ACTIVE" });
  };
  useEffect(() => {
    console.log(post.path);
    replyFormDispatch({
      type: "SWITCH_REPLY_FORM_LOADING",
      payload: isLoading,
    });
  }, [isLoading]);

  useEffect(() => {
    if (replyStatus === "loading") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "loading",
          statusMsg: "Preparing your reply.",
        },
      });
    } else if (replyStatus === "error") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "error",
          statusMsg: error.message,
        },
      });
    } else if (replyStatus === "success") {
      statusDispatch({
        type: "RESET_STATUS",
      });
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
          disabled={status === "loading"}
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
          disabled={status === "loading"}
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
