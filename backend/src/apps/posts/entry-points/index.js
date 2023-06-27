import {
  createPost,
  retrievePosts,
  retrieveSinglePost,
} from "../domain/use-cases/index.js";
import { handleAttachmentPreview } from "../domain/use-cases/index.js";
import makePostPost from "./post-post.js";
import makeGetAllPosts from "./get-all-posts.js";
import makeGetSinglePost from "./get-single-post.js";

const postPost = makePostPost({ createPost, handleAttachmentPreview });
const getAllPosts = makeGetAllPosts({ retrievePosts });
const getSinglePost = makeGetSinglePost({ retrieveSinglePost });
const postController = Object.freeze({ postPost, getAllPosts, getSinglePost });

export default postController;
export { postPost, getAllPosts, getSinglePost };
