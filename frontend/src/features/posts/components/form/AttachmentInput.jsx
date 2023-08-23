import { useEffect, useState, useContext } from "react";
import { PostFormContext } from "../../context/PostFormContext";
import StatusNotification from "../../../notifications/components/StatusNotification";
const AttachmentInput = ({ imgCdn, serverStatus }) => {
  const { post, dispatch } = useContext(PostFormContext);
  const [preview, setPreview] = useState(imgCdn);
  useEffect(() => {
    setPreview(imgCdn);
  }, [imgCdn]);
  const bufferToImage = (file) => {
    if (file.type === "application/pdf") {
      return `https://placehold.co/120x160?text=No%0APreview%0AAvailable`;
    }
    return URL.createObjectURL(file);
  };

  const checkFileConstraints = (file) => {
    return (
      file.size < 1000000 &&
      (file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg" ||
        file.type == "application/pdf")
      //TODO: change to constants
    );
  };
  const handleSubmit = (e) => {
    dispatch({ type: "RESET_STATUS", payload: null });
    let file = e.target.files[0];
    if (file && checkFileConstraints(file)) {
      URL.revokeObjectURL(preview);
      setPreview((prev) => bufferToImage(file));
      dispatch({ type: "UPDATE_POST", payload: { ...post, file: file } });
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "success",
          msg: "File has been attached.",
        },
      });
    } else {
      dispatch({
        type: "UPDATE_STATUS",
        payload: {
          status: "error",
          msg: "File could not be attached. Please only attach .png, .jpg, .jpeg, or .pdf files, and ensure your file is smaller than 1MB.",
        },
      });
    }
  };

  return (
    <>
      <span className="flex flex-wrap flex-col md:flex-row justify-center items-center">
        <label
          htmlFor="file"
          className={`font-medium text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg px-5 py-2.5 flex items-center justify-center ${
            serverStatus?.isLoading && "bg-amber-800/50"
          }`}
        >
          Attach your resume
        </label>

        <input
          className="hidden"
          type="file"
          name="file"
          id="file"
          accept="image/png,image/jpg,image/jpeg,application/pdf"
          onInput={handleSubmit}
          disabled={serverStatus?.isLoading}
        />
        <img
          src={preview}
          className={`m-2 h-[10em] ${!preview && "hidden"}`}
          alt="A preview of your resume"
        />
      </span>
    </>
  );
};

export default AttachmentInput;
