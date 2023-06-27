import { createPost, retrievePosts } from "../domain/use-cases/index.js";
import { handleAttachmentPreview } from "../domain/use-cases/index.js";
import makePostPost from "./post-post.js";
import makeGetAllPosts from "./get-all-posts.js";

const postPost = makePostPost({ createPost, handleAttachmentPreview });
const getAllPosts = makeGetAllPosts({ retrievePosts });
const postController = Object.freeze({ postPost, getAllPosts });

export default postController;
export { postPost, getAllPosts };
