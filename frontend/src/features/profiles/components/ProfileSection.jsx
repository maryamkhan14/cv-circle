import { useContext } from "react";
import { StatusContext } from "../../notifications/context/StatusContext";
const ProfileSection = ({ children }) => {
  const { status } = useContext(StatusContext);
  return (
    <div
      className={`${
        status === "loading" && "animate-pulse"
      } flex flex-col w-full h-full items-start px-5 gap-5 border-b-2 border-slate-50 py-5`}
    >
      {children?.length ? children : [children]}
    </div>
  );
};

export default ProfileSection;
