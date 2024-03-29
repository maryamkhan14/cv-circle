import { toast } from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDelete } from "../hooks";
import { ProfileContext } from "../context/ProfileContext";
import {
  useInteractive,
  useInteractiveDispatch,
} from "../../../context/InteractiveContext";

const DeletePrompt = ({ activeContext }) => {
  const [active, setActive] = activeContext;
  const interactive = useInteractive();
  const interactiveDispatch = useInteractiveDispatch();
  const navigate = useNavigate();
  const { status, mutateAsync: remove } = useUserDelete();

  const [confirmation, setConfirmation] = useState("");
  const { profile } = useContext(ProfileContext);
  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    if (confirmation === profile?.email) {
      setActive(!active);
      toast.promise(remove(), {
        loading: "Account is being deleted.",
        success: "Account has been deleted.",
        error: (error) => error.message,
      });
    }
  };
  useEffect(() => {
    if (status !== "idle")
      interactiveDispatch({ type: "UPDATE_INTERACTIVE", payload: status });
    if (status === "success") navigate("/logout");
  }, [status]);
  return (
    active && (
      <div className="flex flex-col gap-3 p-3 rounded text-red-800 border border-red-300 rounded-lg bg-red-50 mt-2 md:mt-0">
        <label
          htmlFor="delete-warning"
          className="flex items-center gap-3  text-left text-amber-800 md:mr-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          Warning! This will delete ALL your posts, comments, and votes. Please
          enter your email to confirm you wish to delete this account.
        </label>
        <div className="flex items-center gap-5">
          <input
            className="border border-slate-800  p-2 rounded  bg-slate-50/50 focus:bg-slate-50 min-w-[30%] text-amber-800 "
            type="text"
            name="email"
            required="required"
            value={confirmation}
            onChange={(e) => {
              setConfirmation(e.target.value);
            }}
            placeholder={profile?.email}
          />
          <button
            className="whitespace-nowrap text-slate-50 bg-red-500 hover:bg-red-500/90 disabled:bg-red-500/50  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center"
            onClick={handleConfirmDelete}
            disabled={
              !interactive ||
              confirmation !== profile?.email ||
              status === "loading"
            }
          >
            Delete Anyway
          </button>
        </div>
      </div>
    )
  );
};

export default DeletePrompt;
