import { toast } from "react-hot-toast";
import { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import {
  useInteractive,
  useInteractiveDispatch,
} from "../../../context/InteractiveContext";
import { useUserUpdate } from "../hooks";
import DeletePrompt from "./DeletePrompt";
const AccountActions = () => {
  const [deletePromptActive, setDeletePromptActive] = useState(false);
  const { profile } = useContext(ProfileContext);
  const interactiveDispatch = useInteractiveDispatch();
  const interactive = useInteractive();
  const { status, mutateAsync: update } = useUserUpdate();
  const updateProfile = async (e) => {
    e.preventDefault();
    toast.promise(update(profile), {
      loading: "Updating your profile.",
      success:
        "Profile updated successfully. Feel free to log in again to see your changes!",
      error: (error) => error.message,
    });
  };
  useEffect(() => {
    if (status !== "idle")
      interactiveDispatch({ type: "UPDATE_INTERACTIVE", payload: status });
  }, [status]);
  const handleDelete = async (e) => {
    e.preventDefault();
    setDeletePromptActive(!deletePromptActive);
  };
  return (
    <div className="flex flex-col md:flex-row w-full md:items-center m-2 p-2 ">
      <div className="w-full flex md:w-auto mb-4 md:mb-0">
        <button
          className="whitespace-nowrap text-slate-50 disabled:bg-amber-800/50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center mr-10"
          onClick={updateProfile}
          disabled={!interactive}
        >
          Save Changes
        </button>
        <button
          className="whitespace-nowrap disabled:bg-red-500/50 text-slate-50 bg-red-500 hover:bg-red-500/90  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center mr-5"
          onClick={handleDelete}
          disabled={!interactive}
          type="submit"
        >
          {deletePromptActive ? "Cancel" : "Delete Account"}
        </button>
      </div>
      <DeletePrompt
        activeContext={[deletePromptActive, setDeletePromptActive]}
        disabled={!interactive}
      />
    </div>
  );
};

export default AccountActions;
