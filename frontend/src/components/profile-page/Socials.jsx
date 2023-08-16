import { useContext, useEffect } from "react";
import { ProfileEditContext } from "../../context/ProfileEditContext";
import ProfileSection from "./ProfileSection";
const Socials = () => {
  const { profile, status, dispatch } = useContext(ProfileEditContext);
  const handleChange = (e) =>
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { ...profile, [e.target.name]: e.target.value },
    });
  return (
    <ProfileSection status={status}>
      <h3 className="text-3xl">Socials</h3>
      <div
        id="edit-linkedin"
        className="flex flex-col md:flex-row w-full md:items-center md:gap-3 justify-between"
      >
        <label htmlFor="linkedin" className="font-medium">
          LinkedIn:
        </label>
        <input
          className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50 disabled:bg-slate-50/50"
          type="text"
          value={profile.linkedin}
          name="linkedin"
          required="required"
          placeholder="What is your LinkedIn profile?"
          onChange={handleChange}
          disabled={status && status.success === 1}
        />
      </div>
      <div
        id="edit-twitter"
        className="flex flex-col md:flex-row w-full  md:items-center justify-between md:gap-3"
      >
        <label htmlFor="twitter" className="font-medium">
          Twitter:
        </label>
        <input
          className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50 disabled:bg-slate-50/50"
          type="text"
          value={profile.twitter}
          name="twitter"
          required="required"
          placeholder="What is your Twitter profile?"
          onChange={handleChange}
          disabled={status && status.success === 1}
        />
      </div>
    </ProfileSection>
  );
};

export default Socials;
