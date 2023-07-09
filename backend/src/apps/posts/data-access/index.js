import dbClient from "./db-client.js";
import makePostsDb from "./posts-db.js";
import makeImagesDb from "./images-db.js";

const postsDb = makePostsDb({ dbClient });
const imagesDb = makeImagesDb({ dbClient });
export { postsDb, imagesDb };
