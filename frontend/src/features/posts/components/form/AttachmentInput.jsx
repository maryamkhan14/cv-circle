import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useInteractive } from "../../../../context/InteractiveContext";
import { PostFormContext } from "../../context/PostFormContext";
const AttachmentInput = ({ imgCdn }) => {
  const { post, dispatch: postDispatch } = useContext(PostFormContext);
  const [preview, setPreview] = useState(imgCdn);
  const interactive = useInteractive();
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
    let file = e.target.files[0];
    toast.dismiss();
    if (file && checkFileConstraints(file)) {
      URL.revokeObjectURL(preview);
      setPreview((prev) => bufferToImage(file));
      postDispatch({ type: "UPDATE_POST", payload: { ...post, file: file } });
      toast.success("File has been attached.");
    } else if (file) {
      toast.error(
        "Please only attach .png, .jpg, .jpeg, or .pdf files, and ensure your file is smaller than 1MB."
      );
    }
  };

  return (
    <>
      <span className="flex flex-col md:flex-row gap-2  items-center">
        <p className="font-medium text-start md:min-w-[5em]">Resume: </p>
        <div
          id="upload-file-input"
          className="flex w-full justify-center mt-2 md:mt-0 md:justify-start  md:w-[90%] items-center gap-5 flex-wrap md:flex-nowrap"
        >
          <img
            src={preview}
            className={`h-[8em] ${!preview && "hidden"}`}
            alt="A preview of your resume"
          />
          <label
            htmlFor="file"
            className={`font-medium text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg px-5 py-2.5 flex items-center justify-center disabled:bg-amber-800/50 gap-2`}
            disabled={!interactive}
          >
            Attach{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
          </label>

          <input
            className="hidden"
            type="file"
            name="file"
            id="file"
            accept="image/png,image/jpg,image/jpeg,application/pdf"
            onInput={handleSubmit}
            onClick={(e) => {
              e.target.value = "";
            }}
            disabled={!interactive}
          />
        </div>
      </span>
    </>
  );
};

export default AttachmentInput;
