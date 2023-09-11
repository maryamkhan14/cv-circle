import { Link } from "react-router-dom";
import LoadingSvg from "../../../../assets/LoadingSvg";
const PostAuthorDropdown = ({ author, status }) => {
  return status === "loading" ? (
    <LoadingSvg />
  ) : status === "success" ? (
    <>
      <div className="px-4 py-3 flex flex-col min-w-[10em] items-between gap-3 justify-center text-center">
        <h3 className="break-words break-all font-medium">
          {author?.displayName || author?.name}
        </h3>
        <h4 className="text-sm italic leading-tight font-medium hyphens-auto break-words w-full">
          {author?.bio || "This user has not set a bio."}
        </h4>
      </div>
      <ul className="py-1 text-center" aria-labelledby="dropdown">
        <li>
          <Link
            to="/profile"
            className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
          >
            <h3 className="text-amber-800">View full profile</h3>
          </Link>
        </li>
      </ul>
    </>
  ) : (
    status === "error" && (
      <div className="px-4 py-3 flex flex-col min-w-[10em] items-between gap-3">
        <p>Error loading user.</p>
      </div>
    )
  );
};

export default PostAuthorDropdown;
