import dbClient from "./db-client.js";
import cacheClient from "./cache-client.js";
import makeSessionsCache from "./sessions-cache.js";
import makeUsersDb from "./users-db.js";
import makeImagesDb from "./images-db.js";
const usersDb = makeUsersDb({ dbClient });
const imagesDb = makeImagesDb({ dbClient });
const sessionsCache = makeSessionsCache({ cacheClient });
export { usersDb, cacheClient, sessionsCache, imagesDb };
