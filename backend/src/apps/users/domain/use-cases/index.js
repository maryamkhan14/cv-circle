import { imagesDb, usersDb, sessionsCache } from "../../data-access/index.js";
import makeSaveUser from "./save-user.js";
import makeRemoveUser from "./remove-user.js";
import makeHandlePicture from "./handle-picture.js";
import makeCacheUser from "./cache-user.js";
import makeUncacheUser from "./uncache-user.js";
import makeRetrieveUser from "./retrieve-user.js";
const retrieveUser = makeRetrieveUser({ usersDb });
const saveUser = makeSaveUser({ usersDb });
const cacheUser = makeCacheUser({ sessionsCache });
const uncacheUser = makeUncacheUser({ sessionsCache });
const removeUser = makeRemoveUser({ usersDb });
const handlePicture = makeHandlePicture({ imagesDb });
const authenticationService = Object.freeze({
  saveUser,
  cacheUser,
  uncacheUser,
  removeUser,
  retrieveUser,
});
export default authenticationService;
export {
  saveUser,
  cacheUser,
  uncacheUser,
  handlePicture,
  removeUser,
  retrieveUser,
};
