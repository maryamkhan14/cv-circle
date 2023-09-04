import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileSection from "./ProfileSection";
import { StatusContext } from "../../notifications/context/StatusContext";
const BasicInformation = ({ enabled }) => {
  const { profile, dispatch: profileDispatch } = useContext(ProfileContext);
  const { status, dispatch: statusDispatch } = useContext(StatusContext);
  const [profilePic, setProfilePic] = useState("");

  const bufferToImage = (file) => {
    return URL.createObjectURL(file);
  };

  const checkFileConstraints = (file) => {
    return (
      file.size < 2500000 &&
      (file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg")
      //TODO: change to constants
    );
  };
  const handleChange = (e) => {
    if (e.target.name === "file") {
      let file = e.target.files[0];
      URL.revokeObjectURL(profilePic);
      if (checkFileConstraints(file)) {
        setProfilePic(bufferToImage(file));
        file.mimetype = file.type;
        profileDispatch({
          type: "UPDATE_PROFILE",
          payload: { ...profile, file },
        });
      } else {
        statusDispatch({
          type: "UPDATE_STATUS",
          payload: {
            status: "error",
            statusMsg:
              "Error: Please only attach .png, .jpg, or .jpeg files, and ensure your file is smaller than 1MB.",
          },
        });
      }
    } else {
      profileDispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, [e.target.name]: e.target.value },
      });
    }
  };
  useEffect(() => {
    if (!profilePic) {
      setProfilePic(profile.profilePic);
    }
  }, [profile]);
  return (
    <ProfileSection status={status}>
      <h3 className="text-3xl">Basic information</h3>
      <div
        id="edit-name"
        className="flex flex-col md:flex-row w-full md:items-center md:gap-3 justify-between"
      >
        <label htmlFor="displayName" className="font-medium">
          Name:
        </label>
        <input
          className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50"
          type="text"
          value={
            profile.self
              ? profile.displayName
              : profile.displayName || profile.name
          }
          name="displayName"
          disabled={!enabled}
          required="required"
          placeholder="By default, your full name is used."
          onChange={handleChange}
        />
      </div>
      <div
        id="edit-bio"
        className="flex flex-col md:flex-row w-full  md:items-center justify-between md:gap-3"
      >
        <label htmlFor="bio" className="font-medium">
          Bio:
        </label>
        <textarea
          className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50 whitespace-pre-wrap disabled:bg-slate-50/50"
          name="bio"
          rows="5"
          disabled={status === "loading"}
          maxLength={1000}
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself! 🖊️"
        ></textarea>
      </div>
      <div
        id="edit-pic"
        className="flex flex-col md:flex-row w-full md:items-center md:gap-3 justify-between"
      >
        <p className="font-medium text-start">Profile picture: </p>
        <div
          id="edit-pic-input"
          className="flex justify-center mt-2 md:mt-0 md:justify-start  md:w-[90%]  gap-5 flex-wrap md:flex-nowrap"
        >
          <img
            className="self-center rounded-lg w-20 h-20 border border-slate-800"
            src={profilePic}
            alt="profile"
          />
          <label
            htmlFor="file"
            className={`font-medium text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg px-5 py-2.5 flex items-center justify-center self-center ${
              status === "loading" && "bg-amber-800/50 hover:bg-amber-800/50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            Change
          </label>

          <input
            className="hidden"
            type="file"
            name="file"
            id="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={handleChange}
            disabled={status === "loading"}
          />
          <span className="flex self-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 mr-2 shrink-0 stroke-amber-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="font-medium text-amber-800 md:text-start">
              Only .png, .jpg, .jpeg files allowed. Changes to your profile
              picture may take up to an hour to show up.
            </p>
          </span>
        </div>
      </div>
    </ProfileSection>
  );
};

export default BasicInformation;
