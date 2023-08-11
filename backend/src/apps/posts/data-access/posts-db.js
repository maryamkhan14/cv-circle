import _ from "lodash";
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
    isReply: "is_reply",
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

  function nest(posts, rootPostId) {
    let nestedRoot = {};
    if (posts) {
      posts.map((post) => {
        let { path } = post;
        _.setWith(
          nestedRoot,
          post.isReply ? path.replace(/\./g, ".replies.") : path,
          post,
          Object
        );
      });
      return nestedRoot[rootPostId];
    }
    return nestedRoot;
  }

  async function getAll() {
    let result = await dbClient.from("posts_view").select();
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedProfile),
    };
  }

  async function getById(postId, toNest = true) {
    if (toNest) {
      let result = await dbClient
        .from("posts_tree")
        .select(
          '"id", "createdAt", "userId", title, "postContent", "imgCdn", "upvoteCount", path, "isReply", level'
        )
        .containedBy("path", postId);
      return {
        ...result,
        data: [nest(result.data, postId)],
      };
    } else {
      let result = await dbClient
        .from("posts_tree")
        .select(
          '"id", "createdAt", "userId", title, "postContent", "imgCdn", "upvoteCount", path, "isReply", level'
        )
        .eq("id", postId);
      return result;
    }
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
