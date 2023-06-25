import { postPost } from "./index.js";
import express from "express";
import makeCallback from "../../../express-callback/index.js";
const router = express.Router();
router.post("/api/posts", makeCallback(postPost));

export default router;
