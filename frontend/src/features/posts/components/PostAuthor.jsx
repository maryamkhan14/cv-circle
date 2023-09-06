import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../profiles/hooks";
import PostAuthorThumbnail from "./PostAuthorThumbnail";
const PostAuthor = ({ authorId, currentUser }) => {
  let { data: profile, status } = useUserProfile(authorId, currentUser?.userId);
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex="0"
      className="flex justify-end p-1"
      onClick={() => navigate(`/profile/${authorId}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/profile/${authorId}`);
        }
      }}
    >
      <div className="w-14 h-14">
        <PostAuthorThumbnail profile={profile} status={status} />
      </div>
    </div>
  );
};

export default PostAuthor;
