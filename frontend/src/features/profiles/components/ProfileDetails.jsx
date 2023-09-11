import { useContext, useEffect } from "react";
import MainDetails from "./MainDetails";
import BasicInformation from "./BasicInformation";
import Socials from "./Socials";
import PostsCreated from "./PostsCreated";
import AccountActions from "./AccountActions";
import { ProfileContext } from "../context/ProfileContext";
import {
  useInteractive,
  useInteractiveDispatch,
} from "../../../context/InteractiveContext";
const ProfileDetails = ({ user, self }) => {
  const interactiveDispatch = useInteractiveDispatch();
  const interactive = useInteractive();
  const { dispatch: profileDispatch } = useContext(ProfileContext);
  useEffect(() => {
    if (user) {
      profileDispatch({ type: "UPDATE_PROFILE", payload: { ...user, self } });
    }
    if (!self) {
      interactiveDispatch({ type: "TOGGLE_INTERACTIVE" });
    }
  }, []);
  useEffect(() => {
    console.log(interactive);
  }, [interactive]);
  return (
    <form className="rounded flex shadow-md border m-3 w-11/12 md:w-11/12 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
      <MainDetails user={user} />
      <BasicInformation user={user} enabled={interactive} />
      <Socials user={user} enabled={interactive} />
      <PostsCreated user={user} />
      {self && <AccountActions user={user} enabled={interactive} />}
    </form>
  );
};

export default ProfileDetails;
