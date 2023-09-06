import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../profiles/hooks";
import ReplyAuthorThumbnail from "./ReplyAuthorThumbnail";
import MicrophoneSvg from "../assets/MicrophoneSvg";
import Tooltip from "../../../components/Tooltip";
const ReplyAuthor = ({ authorId, currentUser, isOriginalAuthor }) => {
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
      <div className="flex flex-col items-center gap-2">
        <ReplyAuthorThumbnail profile={profile} status={status} />
        {isOriginalAuthor && (
          <div
            className="group/tooltip relative bg overflow-visible"
            aria-describedby="op-tooltip"
          >
            <MicrophoneSvg />
            <Tooltip content="Original poster" ariaId="op-tooltip" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReplyAuthor;
