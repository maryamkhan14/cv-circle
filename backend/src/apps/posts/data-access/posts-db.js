export default function makePostsDb({ dbClient }) {
  // upvote, downvote not added yet
  const dbColumnsToNormalizedProfile = {
    fk_uid: "userId",
    post_content: "postContent",
    img_cdn: "imgCdn",
    created_at: "createdAt",
  };

  const normalizedProfileToDbColumns = {
    userId: "fk_uid",
    postContent: "post_content",
    imgCdn: "img_cdn",
    createdAt: "created_at",
  };

  function renameKeys(obj, keysMap) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );
  }

  function formatDbResults(records, keysMap) {
    return records;
  }

  return Object.freeze({
    getAll,
    getById,
    insert,
    update,
    remove,
  });

  async function getAll() {
    let result = await dbClient.from("posts").select();
    return {
      ...result,
      data: formatDbResults(result.data, dbColumnsToNormalizedProfile),
    };
  }

  async function getById(postId) {
    let result = await dbClient.from("posts").select().eq("id", postId);
    return {
      ...result,
      data: formatDbResults(result.data, dbColumnsToNormalizedProfile),
    };
  }

  async function update(updateDetails) {
    let renamedUpdateDetails = renameKeys(
      updateDetails,
      normalizedProfileToDbColumns
    );
    let result = await dbClient
      .from("posts")
      .update(renamedUpdateDetails)
      .eq("id", renamedUpdateDetails.id)
      .select(); //possible error with select? TODO: remove comment if not

    return {
      ...result,
      data: formatDbResults(result.data, dbColumnsToNormalizedProfile),
    };
  }
  async function remove() {}
  async function insert({ userId, title, postContent, imgCdn }) {
    let result = await dbClient
      .from("posts") // TODO: Add .env for "posts"
      .insert({
        fk_uid: userId,
        title: title,
        post_content: postContent,
        img_cdn: imgCdn,
      })
      .select();

    return {
      ...result,
      data: formatDbResults(result.data, dbColumnsToNormalizedProfile),
    };
  }
}
