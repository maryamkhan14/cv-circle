import { createPost } from "../domain/use-cases/index.js";
import { handleAttachmentPreview } from "../domain/use-cases/index.js";
import makePostPost from "./post-post.js";

const postPost = makePostPost({ createPost, handleAttachmentPreview });
const postController = Object.freeze({ postPost });
export default postController;

export { postPost };
