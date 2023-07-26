import {
  createPost,
  retrievePosts,
  retrieveSinglePost,
  updatePost,
  removePost,
} from "../../domain/use-cases/index.js";
import { handleAttachmentPreview } from "../../domain/use-cases/index.js";
import makePostPost from "./post/post-post.js";
import makeGetAllPosts from "./get/get-all-posts.js";
import makeGetSinglePost from "./get/get-single-post.js";
import makePatchPost from "./patch/patch-post.js";
import makeDeletePost from "./delete/delete-post.js";

const postPost = makePostPost({ createPost, handleAttachmentPreview });
const getAllPosts = makeGetAllPosts({ retrievePosts });
const getSinglePost = makeGetSinglePost({ retrieveSinglePost });
const patchPost = makePatchPost({ updatePost, handleAttachmentPreview });
const deletePost = makeDeletePost({ removePost });
const postController = Object.freeze({
  postPost,
  getAllPosts,
  getSinglePost,
  patchPost,
  deletePost,
});

export default postController;
export { postPost, getAllPosts, getSinglePost, patchPost, deletePost };
