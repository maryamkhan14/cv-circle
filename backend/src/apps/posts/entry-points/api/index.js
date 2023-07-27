import {
  postPost,
  getAllPosts,
  getSinglePost,
  patchPost,
  deletePost,
  postVote,
} from "./post-controller.js";
import authMiddleware from "../../auth-middleware/index.js";
import express from "express";
import makeCallback from "../../express-callback/index.js";
const router = express.Router();

router.post("/", authMiddleware, makeCallback(postPost));
router.get("/", makeCallback(getAllPosts));
router.get("/:id", makeCallback(getSinglePost));
router.patch("/:id", authMiddleware, makeCallback(patchPost));
router.delete("/:id", authMiddleware, makeCallback(deletePost));
router.post("/", authMiddleware, makeCallback(postVote));

export default router;
