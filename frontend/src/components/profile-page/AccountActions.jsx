import { useState, useContext } from "react";
import { ProfileEditContext } from "../../context/ProfileEditContext";
const AccountActions = () => {
  const [deletePromptActive, setDeletePromptActive] = useState(false);
  const { profile, status, dispatch } = useContext(ProfileEditContext);
  const checkFileConstraints = (file) => {
    return (
      file.size < 1000000 &&
      (file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "application/pdf")
      //TODO: change to constants
    );
  };
  /**
  const updateProfile = async (e) => 
    e.preventDefault();
    let { file } = post;
    if (!file || checkFileConstraints(file)) {
      let { data, error } = await createPost({ ...post });
      if (error) {
        setStatus({
          error: true,
          msg: error,
          success: 0,
        });
      } else {
        let { posted } = data;
        navigate(`/post/${posted.id}`);
      }
    } else {
      setStatus({
        error: true,
        msg: "Error: Please only attach .pdf, .png, .jpg, or .jpeg files, and ensure your file is smaller than 1MB.",
        success: 0,
      });
    }
  };*/
  return (
    <div className="flex flex-col md:flex-row w-full md:items-center m-2 ">
      <button className="whitespace-nowrap text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center m-2 md:mr-10">
        Save Changes
      </button>
      <button
        className="whitespace-nowrap text-slate-50 bg-red-500 hover:bg-red-500/90  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center m-2 md:mr-5"
        onClick={(e) => setDeletePromptActive(!deletePromptActive)}
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
            className="whitespace-nowrap text-slate-50 bg-red-500 hover:bg-red-500/90  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center self-center m-2 md:mr-5"
            onClick={(e) => setDeletePromptActive(!deletePromptActive)}
          >
            Delete Anyway
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountActions;
