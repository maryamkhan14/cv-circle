export default function makePostsDb({ dbClient }) {
  const dbColumnsToNormalizedProfile = {
    fk_uid: "userId",
    post_content: "postContent",
    img_cdn: "imgCdn",
    created_at: "createdAt",
    upvote_count: "upvoteCount",
    parent_id: "parentId",
  };

  const normalizedProfileToDbColumns = {
    userId: "fk_uid",
    postContent: "post_content",
    imgCdn: "img_cdn",
    createdAt: "created_at",
    parentId: "parent_id",
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

  async function getReplyById(postId) {
    let result = await dbClient.from("replies_view").select().eq("id", postId);
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedProfile),
    };
  }

  async function update(updateDetails) {
    let result = await dbClient
      .from("posts")
      .update({ ...renameKeys(updateDetails, normalizedProfileToDbColumns) })
      .eq("id", updateDetails.id);
    return { ...result };
  }
  async function remove(postId, userId) {
    let result = await dbClient
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("fk_uid", userId);
    return { ...result };
  }
  async function insert(insertDetails) {
    let result = await dbClient
      .from("posts") // TODO: Add .env for "posts"
      .insert({ ...renameKeys(insertDetails, normalizedProfileToDbColumns) })
      .select();
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedProfile),
    };
  }

  return Object.freeze({
    getAll,
    getReplyById,
    getById,
    insert,
    update,
    remove,
  });
}
