import makeUser from "../entities/user/index.js";
import makeSaveUser from "./save-user.js";
import { usersDb } from "../../data-access/index.js";

const saveUser = makeSaveUser({
  usersDb,
  makeUser,
});
const authenticationService = Object.freeze({ saveUser });

export { saveUser };
