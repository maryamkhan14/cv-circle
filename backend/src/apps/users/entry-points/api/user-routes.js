import express from "express";
import { patchUser, deleteUser, getUser } from "./user-controller.js";
import makeExpressCallback from "../../express-callback/index.js";
import authMiddleware from "../../auth-middleware/index.js";

const router = express.Router();
router.patch("/", authMiddleware(true), makeExpressCallback(patchUser));
router.delete("/", authMiddleware(), makeExpressCallback(deleteUser));
router.get("/:userId", makeExpressCallback(getUser));
export default router;
