import makeUser from "../entities/user/index.js";
import makeSaveUser from "./save-user.js";
import { usersDb, sessionsCache } from "../../data-access/index.js";
import makeUpdateCache from "./update-cache.js";
const saveUser = makeSaveUser({
  usersDb,
  makeUser,
});
const updateCache = makeUpdateCache({ sessionsCache });
const authenticationService = Object.freeze({ saveUser, updateCache });

export default authenticationService;
export { saveUser, updateCache };
