import React from "react";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { supabase } from "../client";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const PostForm = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentError, setAttachmentError] = useState("");
  const [postStatus, setPostStatus] = useState({});
  const [existingPostImage, setExistingPostImage] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    if (
      attachment &&
      attachment.type != "image/png" &&
      attachment.type != "image/jpg" &&
      attachment.type != "image/jpeg"
    ) {
      setAttachmentError(
        "Error: Please only attach .png, .jpg, or .jpeg files."
      );
    } else if (attachment || id) {
      setPost({
        title: title,
        postContent: postContent,
        attachment: attachment,
      });
      uploadPost();
    } else {
      console.log(attachment);
      setAttachmentError("Error: Please attach a resume.");
    }
  };

  const uploadPost = async () => {
    if (id) {
      if (attachment) {
        const imgUploadResults = await uploadImage();
        if (imgUploadResults.success) {
          await supabase
            .from("posts")
            .update({
              title: title,
              post_content: postContent,
              img_cdn: imgUploadResults.cdnUrl,
            })
            .eq("id", id);

          setPostStatus({
            success: true,
            msg: "Post saved!",
          });
          setTitle("");
          setPostContent("");
          setPost({});
        }
      } else {
        await supabase
          .from("posts")
          .update({
            title: title,
            post_content: postContent,
          })
          .eq("id", id);
        setPostStatus({
          success: true,
          msg: "Post saved!",
        });
        setTitle("");
        setPostContent("");
        setPost({});
      }
    } else {
      const imgUploadResults = await uploadImage();
      if (imgUploadResults.success) {
        await supabase
          .from("posts")
          .insert({
            fk_uid: user.id,
            title: title,
            post_content: postContent,
            img_cdn: imgUploadResults.cdnUrl,
          })
          .select();

        setPostStatus({
          success: true,
          msg: "Post saved!",
        });
        setTitle("");
        setPostContent("");
        setPost({});
      } else {
        setPostStatus({
          success: false,
          msg: "An error occurred when uploading your post. Please refresh the page and try again.",
        });
      }
    }
  };

  const uploadImage = async () => {
    if (attachment) {
      const cdnExtension = user.id + "/" + uuidv4();
      const { data, error } = await supabase.storage
        .from("images")
        .upload(cdnExtension, attachment);

      if (data) {
        return {
          success: true,
          cdnUrl: import.meta.env.VITE_SUPABASE_BASE_CDN_URL + cdnExtension,
          error: "",
        };
      } else {
        console.log("error", error);
        return {
          success: false,
          cdnUrl: "",
          error: error,
        };
      }
    } else {
      console.log("no attachment");
    }
  };
  const getPost = async () => {
    const { data, errors } = await supabase.from("posts").select().eq("id", id);
    if (errors) {
      return null;
    } else {
      return data[0];
    }
  };
  useEffect(() => {
    if (id) {
      getPost().then((existingPost) => {
        setTitle(existingPost.title);
        setPostContent(existingPost["post_content"]);
        setExistingPostImage(existingPost["img_cdn"]);
      });
    }
  }, []);

  return (
    <div className="flex items-stretch min-w-[80%] min-h-[80%] m-3 gap-5 p-3 rounded shadow-md border backdrop-blur-xl">
      <form className="rounded flex flex-col justify-between gap-5 p-3 min-h-full w-full">
        <h1 className="text-4xl font-semibold text-slate-900">
          {id ? "Edit your post" : "Create a post"}
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
            accept="image/png,image/jpg,image/jpeg"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
          {attachment && attachment.name ? (
            <p className="self-center m-2 italic">{attachment.name}</p>
          ) : (
            id && <img src={existingPostImage} width={100} className="m-2" />
          )}

          {attachmentError && (
            <p className="font-bold text-amber-800">{attachmentError}</p>
          )}
        </span>
        <span className="flex self-center">
          <button
            type="submit"
            className="text-slate-50 bg-amber-800 hover:bg-amber-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg px-5 py-2.5 flex items-center justify-center mr-2 mb-2"
            onClick={createPost}
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
            {id ? "Update post" : "Create post"}
          </button>
        </span>
      </form>
    </div>
  );
};

export default PostForm;
