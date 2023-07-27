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

  function format(records, keysMap) {
    return records.map((record) => renameKeys(record, keysMap));
  }

  async function getAll() {
    let result = await dbClient.from("posts_view").select();
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedProfile),
    };
  }

  async function getById(postId) {
    let result = await dbClient.from("posts_view").select().eq("id", postId);
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedProfile),
    };
  }

  async function update(updateDetails) {
    let result = await dbClient
      .from("posts")
      .update(updateDetails)
      .eq("id", updateDetails.id);
    return { ...result };
  }
  async function remove(postId, userId) {
    let result = await dbClient
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("userId", userId);
    return { ...result };
  }
  async function insert(insertDetails) {
    let result = await dbClient
      .from("posts") // TODO: Add .env for "posts"
      .insert(insertDetails)
      .select();
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedProfile),
    };
  }

  return Object.freeze({
    getAll,
    getById,
    insert,
    update,
    remove,
  });
}
