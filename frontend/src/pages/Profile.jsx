import { ProfileContextProvider } from "../features/profiles/context/ProfileContext";
import { useOutletContext, useParams } from "react-router-dom";
import { StatusContextProvider } from "../features/notifications/context/StatusContext";
import { useUserProfile } from "../features/profiles/hooks";
import ProfileDetails from "../features/profiles/components/ProfileDetails";
import ProfileSkeleton from "../features/profiles/components/ProfileSkeleton";
const Profile = () => {
  const [user] = useOutletContext();
  const { id: toRetrieveId } = useParams();

  const {
    data: profile,
    status,
    error,
  } = useUserProfile(toRetrieveId, user?.userId);
  /**
   * if neither profile nor user exist, or if error fetching user, then
   * use useEffect to toast error, navigate back home.
   */

  return (
    <StatusContextProvider>
      {status === "loading" ? (
        <ProfileSkeleton />
      ) : (
        <ProfileContextProvider>
          <ProfileDetails
            user={profile || user}
            self={user?.userId === toRetrieveId || (!profile && user?.userId)}
          />
        </ProfileContextProvider>
      )}
    </StatusContextProvider>
  );
};

export default Profile;
