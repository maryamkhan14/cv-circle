/* istanbul ignore file */
import {
  saveUser,
  handlePicture,
  removeUser,
  retrieveUser,
} from "../../domain/use-cases/index.js";
import makePatchUser from "./patch/patch-user.js";
import makeDeleteUser from "./delete/delete-user.js";
import makeGetUser from "./get/get-user.js";
const patchUser = makePatchUser({ saveUser, handlePicture });
const deleteUser = makeDeleteUser({ removeUser });
const getUser = makeGetUser({ retrieveUser });
const userController = Object.freeze({
  patchUser,
  deleteUser,
  getUser,
});

export default { userController };

export { patchUser, deleteUser, getUser };
