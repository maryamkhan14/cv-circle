import dbClient from "./db-client.js";
import makePostsDb from "./posts-db.js";
import makeImagesDb from "./images-db.js";
import makeSessionsCache from "./sessions-cache.js";
import cacheClient from "./cache-client.js";
const postsDb = makePostsDb({ dbClient });
const imagesDb = makeImagesDb({ dbClient });
const sessionsCache = makeSessionsCache({ cacheClient });
export { postsDb, sessionsCache, imagesDb };
