import { useContext, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { StatusContext } from "../../notifications/context/StatusContext";
import ProfileSection from "./ProfileSection";
const Socials = () => {
  const { profile, dispatch } = useContext(ProfileContext);
  const { status } = useContext(StatusContext);
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
          placeholder="What is your LinkedIn profile?"
          onChange={handleChange}
          disabled={status === "success"}
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
          placeholder="What is your Twitter profile?"
          onChange={handleChange}
          disabled={status === "success"}
        />
      </div>
    </ProfileSection>
  );
};

export default Socials;
