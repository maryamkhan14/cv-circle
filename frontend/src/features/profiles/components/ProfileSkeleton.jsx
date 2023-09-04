import ProfileSection from "./ProfileSection";
const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse rounded flex shadow-md border m-3 w-11/12 md:w-11/12 bg-slate-100/50 flex-col items-center px-3 py-5 font-[700] text-center">
      <ProfileSection>
        <div className="flex flex-wrap flex-col md:flex-row items-center py-5 w-full gap-5 wrap justify-center">
          <div
            className="self-center rounded-lg w-40 h-40 border bg-gray-300 animate-pulse"
            alt="profile"
          ></div>
          <div
            className="flex flex-col justify-center  md:items-start gap-5 md:ml-5 w-[45%]"
            id="name-and-email"
          >
            <div className="bg-gray-300 w-full h-[1.5em] rounded "></div>
            <div className="bg-gray-300 w-full h-[1em] rounded"></div>
          </div>
        </div>
      </ProfileSection>

      <ProfileSection>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
      </ProfileSection>
      <ProfileSection>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
        <div className="w-full bg-gray-300 h-[1em]"></div>
      </ProfileSection>
    </div>
  );
};

export default ProfileSkeleton;
