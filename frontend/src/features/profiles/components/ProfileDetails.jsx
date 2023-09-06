import { useContext, useEffect } from "react";
import MainDetails from "./MainDetails";
import BasicInformation from "./BasicInformation";
import Socials from "./Socials";
import PostsCreated from "./PostsCreated";
import AccountActions from "./AccountActions";
import { StatusContext } from "../../notifications/context/StatusContext";
import StatusNotification from "../../notifications/components/StatusNotification";
import { ProfileContext } from "../context/ProfileContext";
const ProfileDetails = ({ user, self }) => {
  const { status } = useContext(StatusContext);
  const { dispatch: profileDispatch } = useContext(ProfileContext);
  useEffect(() => {
    if (user) {
      profileDispatch({ type: "UPDATE_PROFILE", payload: { ...user, self } });
    }
  }, []);
  return (
    <form className="rounded flex shadow-md border m-3 w-11/12 md:w-11/12 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
      <MainDetails user={user} />
      <BasicInformation user={user} enabled={self && status !== "loading"} />
      <Socials user={user} enabled={self && status !== "loading"} />
      <PostsCreated user={user} />
      {self && <AccountActions user={user} enabled={status !== "loading"} />}
      <StatusNotification popup={"true"} />
    </form>
  );
};

export default ProfileDetails;
