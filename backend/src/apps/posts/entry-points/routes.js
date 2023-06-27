import { postPost, getAllPosts } from "./index.js";
import express from "express";
import makeCallback from "../../../express-callback/index.js";
const router = express.Router();
router.post("/", makeCallback(postPost));
router.get("/", makeCallback(getAllPosts));
export default router;
