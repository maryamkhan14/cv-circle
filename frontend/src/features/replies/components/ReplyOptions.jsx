import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useReplyDeletion } from "../hooks";
import { ReplyFormContext } from "../context/ReplyFormContext";
import { StatusContext } from "../../notifications/context/StatusContext";

const ReplyOptions = ({ user, reply }) => {
  // hide when reply form is active
  const { replyForm, dispatch: replyFormDispatch } =
    useContext(ReplyFormContext);
  const { status, dispatch: statusDispatch } = useContext(StatusContext);
  const navigate = useNavigate();
  const {
    status: deleteStatus,
    error,
    mutateAsync: remove,
  } = useReplyDeletion(reply.id);
  const handleDeleteClick = async () => {
    remove(reply.id);
  };
  useEffect(() => {
    if (deleteStatus === "loading") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "loading",
          statusMsg: "Reply is being deleted.",
        },
      });
    } else if (deleteStatus === "success") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "success",
          statusMsg: "Reply has been deleted.",
        },
      });
      navigate(".", { relative: "path" }); // force re-render
    } else if (deleteStatus === "error") {
      statusDispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "error",
          statusMsg: error.message,
        },
      });
    }
  }, [deleteStatus]);
  const handleReplyFormChange = (e) => {
    e.preventDefault();
    replyFormDispatch({ type: "SWITCH_REPLY_FORM_ACTIVE" });
    replyFormDispatch({
      type: "SET_MODE",
      payload: e.target.getAttribute("name"),
    });
  };

  return user ? (
    <>
      <span
        className={`${
          replyForm.active && "hidden"
        } flex self-center justify-center gap-5  md:gap-0 w-full md:w-auto md:self-end`}
      >
        <button
          name="create"
          type="submit"
          aria-label="Create reply"
          className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
          onClick={handleReplyFormChange}
          disabled={status === "loading"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 self-center flex items-center"
            name="create"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              name="create"
            />
          </svg>
        </button>
        {user.userId === reply.userId && (
          <>
            <button
              name="edit"
              type="submit"
              aria-label="Edit reply"
              className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
              onClick={handleReplyFormChange}
              disabled={status === "loading"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                name="edit"
                className="w-4 h-4 self-center flex items-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  name="edit"
                />
              </svg>
            </button>
            <button
              name="delete"
              type="submit"
              aria-label="Delete reply"
              className="text-slate-50 bg-red-500 hover:bg-red-500/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
              onClick={handleDeleteClick}
              disabled={status === "loading"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 self-center flex items-center"
                name="delete"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  name="delete"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </>
        )}
      </span>
    </>
  ) : (
    <></>
  );
};
export default ReplyOptions;
