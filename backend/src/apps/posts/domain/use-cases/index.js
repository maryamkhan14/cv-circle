import makeCreatePost from "./create-post.js";
import makeRetrievePosts from "./retrieve-posts.js";
import makeRetrieveSinglePost from "./retrieve-single-post.js";
import makePdfPreview from "../services/pdf-preview/index.js";
import makeImage from "../entities/image/index.js";
import makeHandleAttachmentPreview from "./handle-attachment-preview.js";
import makeUpdatePost from "./update-post.js";
import makeVotePost from "./vote-post.js";
import { postsDb, imagesDb, votesDb } from "../../data-access/index.js";
import makeRemovePost from "./remove-post.js";

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
const removePost = makeRemovePost({ postsDb });
const votePost = makeVotePost({ votesDb });
const postService = Object.freeze({
  createPost,
  handleAttachmentPreview,
  retrievePosts,
  retrieveSinglePost,
  updatePost,
  votePost,
  removePost,
});
export default postService;
export {
  createPost,
  handleAttachmentPreview,
  retrievePosts,
  retrieveSinglePost,
  updatePost,
  removePost,
  votePost,
};
