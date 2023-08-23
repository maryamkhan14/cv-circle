import { useContext, useEffect } from "react";
import { StatusContext } from "../../notifications/context/StatusContext";
import { ProfileEditContext } from "../context/ProfileEditContext";
const MainDetails = ({ user }) => {
  const { status, statusMsg } = useContext(StatusContext);
  const { dispatch: profileDispatch } = useContext(ProfileEditContext);
  useEffect(() => {
    if (user) {
      console.log(user, user.profilePic);
      profileDispatch({ type: "UPDATE_PROFILE", payload: { ...user } });
    }
  }, [user]);
  return (
    <div
      id="main-details"
      className="flex flex-wrap flex-col md:flex-row items-center border-b-2 border-slate-50 py-5 w-full gap-5 wrap justify-center"
    >
      <img
        className="self-center rounded-full w-40 h-40 border-2 border-blue-800"
        src={user?.profilePic}
        alt="profile"
      />
      <div
        className="flex flex-col justify-center  md:items-start gap-5 md:ml-5 "
        id="name-and-email"
      >
        <h1 className="text-5xl">{user?.displayName || user?.name}</h1>{" "}
        {/* TODO: change to displayName */}
        <h2 className="text-3xl italic">{user?.email}</h2>
      </div>
    </div>
  );
};

export default MainDetails;
