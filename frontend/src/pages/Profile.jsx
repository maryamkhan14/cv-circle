import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { ProfileContextProvider } from "../features/profiles/context/ProfileContext";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useUserProfile } from "../features/profiles/hooks";
import ProfileDetails from "../features/profiles/components/ProfileDetails";
import ProfileSkeleton from "../features/profiles/components/ProfileSkeleton";
import { InteractiveContextProvider } from "../context/InteractiveContext";
const Profile = () => {
  const [user] = useOutletContext();
  const { id: toRetrieveId } = useParams();
  const navigate = useNavigate();
  const {
    data: profile,
    status,
    error,
  } = useUserProfile(toRetrieveId, user?.userId);
  /**
   * if neither profile nor user exist, or if error fetching user, then
   * use useEffect to toast error, navigate back home.
   */
  useEffect(() => {
    if (error) {
      toast.error("Error loading profile.");
      navigate("/");
    }
  }, [error]);
  return (
    <InteractiveContextProvider>
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
    </InteractiveContextProvider>
  );
};

export default Profile;
