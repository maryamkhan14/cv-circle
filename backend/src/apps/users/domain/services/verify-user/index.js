import { saveUser, updateUsersTopic } from "../../use-cases/index.js";
import isolateProfileDetails from "../isolate-profile-details/index.js";
import makeVerifyUser from "./verify-user.js";

const verifyUser = makeVerifyUser({
  saveUser,
  isolateProfileDetails,
  updateUsersTopic,
});

export default verifyUser;
