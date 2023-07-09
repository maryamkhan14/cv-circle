import { postPost, getAllPosts, getSinglePost, patchPost } from "./post-controller.js";
import express from "express";
import makeCallback from "../../../express-callback/index.js";
const router = express.Router();

router.post("/", makeCallback(postPost, true));
router.get("/", makeCallback(getAllPosts));
router.get("/:id", makeCallback(getSinglePost));
router.patch("/:id", makeCallback(patchPost, true));

export default router;