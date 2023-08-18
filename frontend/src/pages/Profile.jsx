import { ProfileEditContextProvider } from "../features/profiles/context/ProfileEditContext";
import MainDetails from "../features/profiles/components/MainDetails";
import BasicInformation from "../features/profiles/components/BasicInformation";
import AccountActions from "../features/profiles/components/AccountActions";
import Socials from "../features/profiles/components/Socials";

const Profile = () => {
  return (
    <ProfileEditContextProvider>
      <form className="rounded flex shadow-md border m-3 w-5/6 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
        <MainDetails />
        <BasicInformation />
        <Socials />
        <AccountActions />
      </form>
    </ProfileEditContextProvider>
  );
};

export default Profile;
