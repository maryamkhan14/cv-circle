import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { usePostDeletion } from "../hooks";
import { useInteractiveDispatch } from "../../../context/InteractiveContext";
const DeletePrompt = ({ postId, cancel }) => {
  const { status, mutateAsync: remove } = usePostDeletion(postId);
  const interactiveDispatch = useInteractiveDispatch();
  const handleConfirmDelete = () => {
    toast.promise(remove(postId), {
      loading: "Post is being deleted.",
      success: "Post has been deleted. Feel free to navigate away.",
      error: (error) => error.message,
    });
  };
  useEffect(() => {
    if (status !== "idle")
      interactiveDispatch({ type: "UPDATE_INTERACTIVE", payload: status });
  }, [status]);
  return (
    <div className="flex gap-3 p-3 rounded text-red-800 border border-red-300 rounded-lg bg-red-50 mt-2 md:mt-0">
      <label
        htmlFor="delete-warning"
        className="flex items-center gap-3  text-left text-amber-800 md:mr-5 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 pt-1 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        <p>This will delete this post and all its replies. Continue?</p>
      </label>
      <div className="flex flex-col justify-between items-center gap-5 pl-3 md:pl-0 md:flex-row">
        <button
          className="whitespace-nowrap text-slate-50 bg-red-500 hover:bg-red-500/90 disabled:bg-red-500/50  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-3 py-2 flex items-center justify-center self-center"
          onClick={handleConfirmDelete}
          disabled={status === "loading"}
        >
          Delete Anyway
        </button>
        <button
          className="text-slate-50 disabled:opacity-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-3 py-2 flex items-center justify-center "
          onClick={cancel}
          disabled={status === "loading"}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePrompt;
