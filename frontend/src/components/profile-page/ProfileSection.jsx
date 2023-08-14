const ProfileSection = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full items-start px-5 gap-5 border-b-2 border-slate-50 py-5">
      {...children}
    </div>
  );
};

export default ProfileSection;
