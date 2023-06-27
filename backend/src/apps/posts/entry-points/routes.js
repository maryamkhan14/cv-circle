import { postPost, getAllPosts, getSinglePost } from "./index.js";
import express from "express";
import makeCallback from "../../../express-callback/index.js";
const router = express.Router();
router.post("/", makeCallback(postPost));
router.get("/", makeCallback(getAllPosts));
router.get("/:id", makeCallback(getSinglePost));
export default router;
