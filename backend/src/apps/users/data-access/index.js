import dbClient from "../../../common-utilities/db/index.js";
import makeUsersDb from "./users-db.js";
const usersDb = makeUsersDb({ dbClient });
export { usersDb };
