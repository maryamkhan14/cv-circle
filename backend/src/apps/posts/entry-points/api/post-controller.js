/* istanbul ignore file */
import {
  createPost,
  retrievePosts,
  retrieveSinglePost,
  updatePost,
  removePost,
  votePost,
} from "../../domain/use-cases/index.js";
import { handleAttachmentPreview } from "../../domain/use-cases/index.js";
import makePostPost from "./post/post-post.js";
import makeGetAllPosts from "./get/get-all-posts.js";
import makeGetSinglePost from "./get/get-single-post.js";
import makePatchPost from "./patch/patch-post.js";
import makeDeletePost from "./delete/delete-post.js";
import makePostVote from "./post/post-vote.js";
const postPost = makePostPost({ createPost, handleAttachmentPreview });
const getAllPosts = makeGetAllPosts({ retrievePosts });
const getSinglePost = makeGetSinglePost({ retrieveSinglePost });
const patchPost = makePatchPost({ updatePost, handleAttachmentPreview });
const deletePost = makeDeletePost({ retrieveSinglePost, removePost });
const postVote = makePostVote({ votePost });

const postController = Object.freeze({
  postPost,
  getAllPosts,
  getSinglePost,
  patchPost,
  deletePost,
  postVote,
});

export default postController;
export {
  postPost,
  getAllPosts,
  getSinglePost,
  patchPost,
  deletePost,
  postVote,
};
