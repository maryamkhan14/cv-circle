import { useContext, useEffect } from "react";
import { ProfileEditContext } from "../../context/ProfileEditContext";
import { UserContext } from "../../context/UserContext";
const MainDetails = () => {
  const { profile, status, dispatch } = useContext(ProfileEditContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch({ type: "UPDATE_PROFILE", payload: { ...user } });
    }
  }, [user]);
  return (
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
  );
};

export default MainDetails;
