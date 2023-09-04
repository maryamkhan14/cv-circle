import { useState, useContext, useEffect } from "react";
import { ProfileEditContext } from "../context/ProfileEditContext";
import { StatusContext } from "../../notifications/context/StatusContext";
import { useUserUpdate } from "../hooks";
import StatusNotification from "../../notifications/components/StatusNotification";
import DeletePrompt from "./DeletePrompt";
const AccountActions = () => {
  const [deletePromptActive, setDeletePromptActive] = useState(false);
  const { profile } = useContext(ProfileEditContext);
  const { dispatch } = useContext(StatusContext);
  const { status: updateStatus, mutateAsync: update, error } = useUserUpdate();
  const updateProfile = async (e) => {
    e.preventDefault();
    update(profile);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    setDeletePromptActive(!deletePromptActive);
    //delete();
  };
  useEffect(() => {
    if (updateStatus === "success") {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "success",
          statusMsg:
            "Profile updated successfully. Feel free to log in again to see your changes!",
        },
      });
    } else if (updateStatus === "loading") {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "loading",
          statusMsg: "Updating profile...",
        },
      });
    }
  }, [updateStatus]);
  return (
    <div className="flex flex-col md:flex-row w-full md:items-center m-2 p-2 ">
      <div className="w-full flex md:w-auto mb-4 md:mb-0">
        <button
          className="whitespace-nowrap text-slate-50 disabled:bg-amber-800/50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center mr-10"
          onClick={updateProfile}
          disabled={updateStatus === "loading"}
        >
          Save Changes
        </button>
        <button
          className="whitespace-nowrap disabled:bg-red-500/50 text-slate-50 bg-red-500 hover:bg-red-500/90  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center mr-5"
          onClick={handleDelete}
          disabled={updateStatus === "loading"}
          type="submit"
        >
          {deletePromptActive ? "Cancel" : "Delete Account"}
        </button>
      </div>
      <DeletePrompt
        activeContext={[deletePromptActive, setDeletePromptActive]}
        disabled={updateStatus === "loading"}
      />
    </div>
  );
};

export default AccountActions;
