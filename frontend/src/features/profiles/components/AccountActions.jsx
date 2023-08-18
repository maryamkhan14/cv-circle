import { useState, useContext } from "react";
import { ProfileEditContext } from "../context/ProfileEditContext";
import { updateUser } from "../services";
import StatusNotification from "../../../components/status-update/StatusNotification";
const AccountActions = () => {
  const [deletePromptActive, setDeletePromptActive] = useState(false);
  const { profile, status, dispatch } = useContext(ProfileEditContext);

  const updateProfile = async (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_STATUS",
      payload: {
        error: false,
        msg: "Updating your profile...",
        success: 1,
      },
    });
    let { updated, error } = await updateUser({ ...profile });
    if (error) {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          error: true,
          msg: error.message,
          success: 0,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          error: false,
          msg: "Successfully updated profile! Feel free to log out and log back in to see your changes.",
          success: 2,
        },
      });
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full md:items-center m-2 ">
      <button
        className="whitespace-nowrap text-slate-50 disabled:bg-amber-800/50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center m-2 md:mr-10"
        onClick={updateProfile}
        disabled={status && status.success === 1}
        type="Submit"
      >
        Save Changes
      </button>
      <button
        className="whitespace-nowrap disabled:bg-red-500/50 text-slate-50 bg-red-500 hover:bg-red-500/90  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center m-2 md:mr-5"
        onClick={(e) => setDeletePromptActive(!deletePromptActive)}
        disabled={status && status.success === 1}
      >
        {deletePromptActive ? "Cancel" : "Delete Account"}
      </button>
      {deletePromptActive && (
        <div className="flex flex-col md:flex-row md:items-center">
          <label
            htmlFor="delete-warning"
            className="text-left text-amber-800 md:mr-1"
          >
            Warning! This will delete ALL your posts, comments, and votes.
            Please enter your email to confirm you wish to delete this account.
          </label>

          <input
            className="border border-slate-800  p-2 rounded bg-slate-50/50 focus:bg-slate-50 grow text-amber-800"
            type="text"
            name="email"
            required="required"
            placeholder={profile.email}
          />
          <button
            className="whitespace-nowrap text-slate-50 bg-red-500 hover:bg-red-500/90 disabled:bg-red-500/50  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center m-2 md:mr-5"
            onClick={(e) => setDeletePromptActive(!deletePromptActive)}
            disabled={status && status.success === 1}
          >
            Delete Anyway
          </button>
        </div>
      )}
      <StatusNotification status={status} />
    </div>
  );
};

export default AccountActions;
