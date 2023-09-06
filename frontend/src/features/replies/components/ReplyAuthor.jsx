import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../profiles/hooks";
import ReplyAuthorThumbnail from "./ReplyAuthorThumbnail";
const ReplyAuthor = ({ authorId, currentUser }) => {
  let { data: profile, status } = useUserProfile(authorId, currentUser?.userId);
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex="0"
      className="flex justify-start pr-3"
      onClick={() => navigate(`/profile/${authorId}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/profile/${authorId}`);
        }
      }}
    >
      <div className="w-8 h-8">
        <ReplyAuthorThumbnail profile={profile} status={status} />
      </div>
    </div>
  );
};

export default ReplyAuthor;
