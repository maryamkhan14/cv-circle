import {producer, consumer} from "../entry-points/message-queue/index.js";
import makeAuthMiddleware from "./auth-middleware.js";
const authMiddleware =  makeAuthMiddleware({producer, consumer});
export default authMiddleware;