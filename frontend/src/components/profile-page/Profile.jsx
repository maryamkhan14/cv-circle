import { ProfileEditContextProvider } from "../../context/ProfileEditContext";
import MainDetails from "./MainDetails";
import BasicInformation from "./BasicInformation";
import AccountActions from "./AccountActions";
import Socials from "./Socials";

const Profile = () => {
  return (
    <ProfileEditContextProvider>
      <div className="rounded flex shadow-md border m-3 w-5/6 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
        <MainDetails />
        <BasicInformation />
        <Socials />
        <AccountActions />
      </div>
    </ProfileEditContextProvider>
  );
};

export default Profile;
