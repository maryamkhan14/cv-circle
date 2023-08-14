import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ProfileSection from "./ProfileSection";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profilePic: "",
    displayName: "Maryam Khan",
    linkedin: "",
    twitter: "",
    bio: "",
  });

  useEffect(() => {
    setProfile({ ...profile, ...user });
  }, [user]);
  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
      <div
        id="main-details"
        className="flex flex-col md:flex-row items-center border-b-2 border-slate-50 py-5 w-full gap-5 wrap justify-center"
      >
        <img
          className="self-center rounded-full w-40 h-40"
          src={profile.profilePic}
          alt="profile"
        />
        <div
          className="flex flex-col justify-center  md:items-start gap-5 md:ml-5 "
          id="name-and-email"
        >
          <h1 className="text-5xl">{profile.name}</h1>{" "}
          {/* TODO: change to displayName */}
          <h2 className="text-3xl italic">{profile.email}</h2>
        </div>
      </div>

      <ProfileSection>
        <h3 className="text-3xl">Basic information</h3>
        <div
          id="edit-name"
          className="flex flex-col md:flex-row w-full md:items-center md:gap-3 justify-between"
        >
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <input
            className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50"
            type="text"
            value={profile.displayName}
            name="name"
            required="required"
            placeholder="What should we call you?"
            onChange={(e) =>
              setProfile({ ...profile, displayName: e.target.value })
            }
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
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div
          id="edit-bio"
          className="flex flex-col md:flex-row w-full  md:items-center justify-between md:gap-3"
        >
          <label htmlFor="bio" className="font-medium">
            Bio
          </label>
          <textarea
            className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50 whitespace-pre-wrap"
            name="bio"
            rows="5"
            maxLength={1000}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
              onInput={(e) => {}}
              disabled={status && status.success === 1}
            />
          </div>
        </div>
      </ProfileSection>

      <ProfileSection>
        <h3 className="text-3xl">Socials</h3>
        <div
          id="edit-linkedin"
          className="flex flex-col md:flex-row w-full md:items-center md:gap-3 justify-between"
        >
          <label htmlFor="linkedin" className="font-medium">
            LinkedIn:
          </label>
          <input
            className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50"
            type="text"
            value={profile.linkedin}
            name="linkedin"
            required="required"
            placeholder="What is your LinkedIn profile?"
            onChange={(e) =>
              setProfile({ ...profile, linkedin: e.target.value })
            }
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
            className="border border-slate-800 md:w-[90%]  p-2 rounded bg-slate-50/50 focus:bg-slate-50"
            type="text"
            value={profile.twitter}
            name="twitter"
            required="required"
            placeholder="What is your Twitter profile?"
            onChange={(e) =>
              setProfile({ ...profile, twitter: e.target.value })
            }
          />
        </div>
      </ProfileSection>
    </div>
  );
};

export default Profile;
