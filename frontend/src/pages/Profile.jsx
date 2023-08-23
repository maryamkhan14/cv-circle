import { ProfileEditContextProvider } from "../features/profiles/context/ProfileEditContext";
import MainDetails from "../features/profiles/components/MainDetails";
import BasicInformation from "../features/profiles/components/BasicInformation";
import AccountActions from "../features/profiles/components/AccountActions";
import Socials from "../features/profiles/components/Socials";
import { useOutletContext } from "react-router-dom";
import { StatusContextProvider } from "../features/notifications/context/StatusContext";

const Profile = () => {
  const [user] = useOutletContext();
  return (
    <StatusContextProvider>
      <ProfileEditContextProvider>
        <form className="rounded flex shadow-md border m-3 w-5/6 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
          <MainDetails user={user} />
          <BasicInformation user={user} />
          <Socials user={user} />
          <AccountActions user={user} />
        </form>
      </ProfileEditContextProvider>
    </StatusContextProvider>
  );
};

export default Profile;
