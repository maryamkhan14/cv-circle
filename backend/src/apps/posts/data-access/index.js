import dbClient from "./db-client.js";
import makePostsDb from "./posts-db.js";
import makeImagesDb from "./images-db.js";
import makeSessionsCache from "./sessions-cache.js";
import cacheStore from "./cache-store.js";
const postsDb = makePostsDb({ dbClient });
const imagesDb = makeImagesDb({ dbClient });
const sessionsCache = makeSessionsCache({ cacheStore });
export { postsDb, sessionsCache, cacheStore, imagesDb };
