import makeCreatePost from "./create-post.js";
import makeRetrievePosts from "./retrieve-posts.js";
import makeRetrieveSinglePost from "./retrieve-single-post.js";
import makePdfPreview from "../services/pdf-preview/index.js";
import makeImage from "../entities/image/index.js";
import makeHandleAttachmentPreview from "./handle-attachment-preview.js";
import makeUpdatePost from "./update-post.js";
import { postsDb, imagesDb } from "../../data-access/index.js";

const createPost = makeCreatePost({
  postsDb,
});
const retrievePosts = makeRetrievePosts({ postsDb });
const retrieveSinglePost = makeRetrieveSinglePost({ postsDb });
const handleAttachmentPreview = makeHandleAttachmentPreview({
  imagesDb,
  makePdfPreview,
  makeImage,
});
const updatePost = makeUpdatePost({ postsDb });
const postService = Object.freeze({
  createPost,
  handleAttachmentPreview,
  retrievePosts,
  retrieveSinglePost,
  updatePost,
});
export default postService;
export {
  createPost,
  handleAttachmentPreview,
  retrievePosts,
  retrieveSinglePost,
  updatePost,
};
