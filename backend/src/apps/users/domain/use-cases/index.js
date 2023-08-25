import makeUser from "../entities/user/index.js";
import makeSaveUser from "./save-user.js";
import makeHandlePicture from "./handle-picture.js";
import { imagesDb, usersDb, sessionsCache } from "../../data-access/index.js";
import makeCacheUser from "./cache-user.js";
import makeUncacheUser from "./uncache-user.js";
const saveUser = makeSaveUser({
  usersDb,
  makeUser,
});
const cacheUser = makeCacheUser({ sessionsCache });
const uncacheUser = makeUncacheUser({ sessionsCache });
const authenticationService = Object.freeze({ saveUser, cacheUser });
const handlePicture = makeHandlePicture({ imagesDb });

export default authenticationService;
export { saveUser, cacheUser, uncacheUser, handlePicture };
