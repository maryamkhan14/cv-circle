import { Suspense, useState } from "react";
import PostAuthorDropdown from "../../posts/components/author/PostAuthorDropdown";
import LoadingSvg from "../../../assets/LoadingSvg";
import ErrorSvg from "../../posts/assets/ErrorSvg";
const PostAuthorThumbnail = ({ profile, status }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div
      className="flex w-8 h-8 border-2 border-slate-900 bg-slate-100 rounded-full hover:bg-slate-50 relative group"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {status === "loading" ? (
        <LoadingSvg />
      ) : status === "error" ? (
        <ErrorSvg />
      ) : (
        profile && (
          <img
            alt="Author profile picture"
            src={profile?.profilePic}
            className="rounded-full w-full h-full "
          />
        )
      )}

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="hidden flex flex-col mb-1 md:group-hover:block md:absolute left-0 right-0 bottom-full text-base z-50 w-full pt-1 overflow-visible self-start">
          <div
            id="dropdown"
            className="flex flex-col md:absolute md:group-hover:block border-2 max-w-[10em] bg-white text-base z-50 list-none divide-y divide-gray-100 rounded-lg shadow left-1/2 transform -translate-x-1/2 -translate-y-full justify-center "
          >
            <Suspense fallback={<LoadingSvg />}>
              <PostAuthorDropdown author={profile} status={status} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostAuthorThumbnail;
