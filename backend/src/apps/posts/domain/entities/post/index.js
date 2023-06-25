import buildMakePost from "./post.js";
const makePost = buildMakePost(); // returns the *return value* of buildMakePost, which is the inner makePost function

export default makePost;
