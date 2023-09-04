import { ProfileEditContextProvider } from "../features/profiles/context/ProfileEditContext";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { StatusContextProvider } from "../features/notifications/context/StatusContext";
import useUserProfile from "../features/profiles/hooks/useUserProfile";
import ProfileDetails from "../features/profiles/components/ProfileDetails";
import ProfileSkeleton from "../features/profiles/components/ProfileSkeleton";
const Profile = () => {
  const [user] = useOutletContext();
  const { id: toRetrieveId } = useParams();

  // check toRetrieveId exists, is not the same as current user, and is numeric
  const queryEnabled =
    !!toRetrieveId && user?.userId !== toRetrieveId && !isNaN(toRetrieveId);

  const {
    data: profile,
    status,
    error,
  } = useUserProfile(toRetrieveId, queryEnabled);
  /**
   * if neither profile nor user exist, or if error fetching user, then
   * use useEffect to toast error, navigate back home.
   */

  return (
    <StatusContextProvider>
      {queryEnabled && status === "loading" ? (
        <ProfileSkeleton />
      ) : (
        <ProfileEditContextProvider>
          <ProfileDetails
            user={profile || user}
            self={!profile && user?.userId}
          />
        </ProfileEditContextProvider>
      )}
    </StatusContextProvider>
  );
};

export default Profile;
