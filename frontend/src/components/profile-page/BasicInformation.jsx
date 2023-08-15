import { useContext, useEffect } from "react";
import { ProfileEditContext } from "../../context/ProfileEditContext";
import ProfileSection from "./ProfileSection";
const BasicInformation = () => {
  const { profile, dispatch } = useContext(ProfileEditContext);
  const handleChange = (e) => {
    if (e.target.name === "file") {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file: e.target.files[0] },
      });
    } else {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, [e.target.name]: e.target.value },
      });
    }
  };
  return (
    <ProfileSection>
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
          value={profile.displayName}
          name="displayName"
          required="required"
          placeholder="What should we call you?"
          onChange={handleChange}
        />
      </div>
      <div
        id="edit-email"
        className="flex flex-col md:flex-row w-full  md:items-center justify-between md:gap-3"
      >
        <label htmlFor="email" className="font-medium">
          Email:
        </label>
        <input
          className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50"
          type="text"
          value={profile.email}
          name="email"
          required="required"
          placeholder="What email do you prefer?"
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
          className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50 whitespace-pre-wrap"
          name="bio"
          rows="5"
          maxLength={1000}
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself! 🖊️"
        ></textarea>
      </div>
      <div
        id="edit-pic"
        className="flex flex-col md:flex-row w-full md:items-center md:gap-3"
      >
        <p className="font-medium">Profile picture: </p>
        <div id="edit-pic-input" className="flex self-center gap-5">
          <img
            className="self-center rounded-full w-20 h-20"
            src={profile.profilePic}
            alt="profile"
          />
          <label
            htmlFor="file"
            className={`font-medium text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg px-5 py-2.5 flex items-center justify-center self-center ${
              status && status.success === 1 && "bg-amber-800/50"
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
            disabled={status && status.success === 1}
          />
        </div>
      </div>
    </ProfileSection>
  );
};

export default BasicInformation;
