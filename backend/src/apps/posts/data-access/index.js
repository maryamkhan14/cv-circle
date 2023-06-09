import dbClient from "../../../common-utilities/db/index.js";
import makePostsDb from "./posts-db.js";
import makeImagesDb from "./images-db.js";

const postsDb = makePostsDb({ dbClient });
const imagesDb = makeImagesDb({ dbClient });
export { postsDb, imagesDb };
