import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, testUploadPost, uploadFile, uploadPost } from "../services";

const PostForm = () => {
  const { user } = useContext(UserContext);
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [existingPostImage, setExistingPostImage] = useState("");
  const [attachmentError, setAttachmentError] = useState("");
  const [postStatus, setPostStatus] = useState({});

  const updatePost = async (e) => {
    e.preventDefault();
    console.log("USER", user.id)
    if (!attachment) {
      let { data, error } = await uploadPost({
        title,
        postContent,
        postId,
      });
      if (data) {
        handleSaveResult(true);
        navigate(-1);
      } else {
        handleSaveResult(false, error);
      }
    } else {
      let cdnUrl = await getCdnUrl();
      let { data, error } = await uploadPost({
        title,
        postContent,
        cdnUrl,
        postId,
        userId: user.id
      });
      if (data) {
        handleSaveResult(true);
        navigate(-1);
      } else {
        handleSaveResult(false, error);
      }
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    
    if (!attachment) {
      setAttachmentError("Error: Please attach a resume.");
    } else if (
      attachment.type == "image/png" ||
      attachment.type == "image/jpg" ||
      attachment.type == "image/jpeg" ||
      attachment.type == "application/pdf"
    ) {
      console.log(user)
      let result = await uploadPost({
        userId: user.userId,
        title,
        postContent,
        postId,
        file: attachment,
      });
      console.log(result)
    } else {
      setAttachmentError(
        "Error: Please only attach .pdf, .png, .jpg, or .jpeg files."
      );
    }
  };

  const getCdnUrl = async () => {
    const formData = new FormData();
    formData.append("attachmentFile", attachment);
    formData.append("userId", user.id);

    let { cdnUrl } = await uploadFile(formData);

    return cdnUrl;
  };

  const clear = () => {
    setTitle("");
    setPostContent("");
    setAttachment(null);
    setExistingPostImage("");
  };

  const handleSaveResult = (success, error) => {
    clear();
    if (success) {
      setPostStatus({
        success: true,
        msg: "Post saved!",
      });
    } else {
      console.log(error);
      setPostStatus({
        success: false,
        msg: "An issue happened when trying to save the post. Please refresh the page and try again.",
      });
    }
  };

  // automatically populate fields if editing existing post
  useEffect(() => {
    if (postId) {
      getPost(postId).then(({ data, error }) => {
        if (data) {
          let { title, post_content: postContent, img_cdn: imgCdn } = data[0];
          setTitle(title);
          setPostContent(postContent);
          setExistingPostImage(imgCdn);
        } else {
          console.log(error);
          setPostStatus({
            success: false,
            msg: "Could not find matching post.",
          });
        }
      });
    }
  }, []);

  return (
    <div className="flex items-stretch min-w-[80%] min-h-[80%] m-3 gap-5 p-3 rounded shadow-md border backdrop-blur-xl">
      <form className="rounded flex flex-col justify-between gap-5 p-3 min-h-full w-full">
        <h1 className="text-4xl font-semibold text-slate-900">
          {postId ? "Edit your post" : "Create a post"}
        </h1>
        {postStatus &&
          (postStatus.success ? (
            <p className="font-semibold self-center text-blue-800 text-2xl">
              {postStatus.msg}
            </p>
          ) : (
            <p className="font-semibold self-center text-amber-800 text-2xl">
              {postStatus.msg}
            </p>
          ))}
        <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            className="border border-slate-800 w-full p-2 rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required="required"
          />
        </span>
        <span className="flex flex-col md:flex-row gap-2 justify-center items-center">
          <label htmlFor="post-content" className="font-medium">
            Post
          </label>
          <textarea
            id="post-content"
            name="post-content"
            rows="4"
            cols="50"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="border border-slate-800 w-full p-2 rounded"
          ></textarea>
        </span>
        <span className="flex flex-col md:flex-row justify-center items-center">
          <label
            htmlFor="attachment"
            className="font-medium text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg px-5 py-2.5 flex items-center justify-center"
          >
            Attach Your Resume (only .png, .jpg, .jpeg allowed)
          </label>

          <input
            className="hidden"
            type="file"
            name="attachment"
            id="attachment"
            accept="image/png,image/jpg,image/jpeg,application/pdf"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
          {attachment && attachment.name ? (
            <p className="self-center m-2 italic">{attachment.name}</p>
          ) : (
            postId && (
              <img src={existingPostImage} width={100} className="m-2" />
            )
          )}

          {attachmentError && (
            <p className="font-bold text-amber-800">{attachmentError}</p>
          )}
        </span>
        <span className="flex self-center">
          <button
            type="submit"
            className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
            onClick={postId ? updatePost : createPost}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-2 self-center flex items-center"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            {postId ? "Update post" : "Create post"}
          </button>
        </span>
      </form>
    </div>
  );
};

export default PostForm;
