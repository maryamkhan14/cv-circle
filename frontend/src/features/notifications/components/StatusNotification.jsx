import { useContext } from "react";
import NotificationButtons from "./NotificationButtons";
import { StatusContext } from "../context/StatusContext";
import LoadingSvg from "../assets/LoadingSvg";
import InfoSvg from "../assets/InfoSvg";
const StatusNotification = ({ popup }) => {
  const { status, show, statusMsg } = useContext(StatusContext);
  const errorStyles =
    "text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800";
  const infoStyles =
    "text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800";
  return (
    show &&
    status !== "idle" && (
      <div
        className={`${
          popup && "lg:!fixed"
        } bottom-5 right-5 self-center flex items-center p-4 my-4 border rounded-lg text-sm  ${
          status === "error" ? errorStyles : infoStyles
        }`}
        role="alert"
      >
        {status === "loading" ? <LoadingSvg /> : <InfoSvg />}
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Status: </span> {statusMsg}
        </div>

        <NotificationButtons />
      </div>
    )
  );
};

export default StatusNotification;
