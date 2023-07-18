import makeUser from "../entities/user/index.js";
import makeSaveUser from "./save-user.js";
import { usersDb } from "../../data-access/index.js";
import { producer } from "../../message-producer/index.js";
import makeUpdateUsersTopic from "./update-users-topic.js";
const saveUser = makeSaveUser({
  usersDb,
  makeUser,
});
const updateUsersTopic = makeUpdateUsersTopic({ producer });
const authenticationService = Object.freeze({ saveUser, updateUsersTopic });

export default authenticationService;
export { saveUser, updateUsersTopic };
