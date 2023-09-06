import ProfileSection from "./ProfileSection";

const MainDetails = ({ user }) => {
  return (
    <ProfileSection>
      <div
        id="main-details"
        className="flex flex-wrap flex-col md:flex-row items-center py-5 w-full gap-5 wrap justify-center"
      >
        <img
          className="self-center rounded-lg w-40 h-40 border"
          src={user?.profilePic}
          alt="profile"
        />
        <div
          className="flex flex-col justify-center  md:items-start gap-5 md:ml-5 "
          id="name-and-email"
        >
          <h1 className="text-5xl">{user?.displayName || user?.name}</h1>{" "}
          <h2 className="text-2xl italic">{user?.email}</h2>
        </div>
      </div>
    </ProfileSection>
  );
};

export default MainDetails;
