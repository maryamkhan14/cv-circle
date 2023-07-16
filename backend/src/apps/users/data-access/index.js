import dbClient from "./db-client.js";
import makeUsersDb from "./users-db.js";
const usersDb = makeUsersDb({ dbClient });
export { usersDb };
