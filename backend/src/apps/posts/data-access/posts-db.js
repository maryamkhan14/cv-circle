import _ from "lodash";
export default function makePostsDb({ dbClient }) {
  const dbColumnsToNormalizedPost = {
    fk_uid: "userId",
    post_content: "postContent",
    img_cdn: "imgCdn",
    created_at: "createdAt",
    upvote_count: "upvoteCount",
    is_reply: "isReply",
    parent_id: "parentId",
  };

  const normalizedPostToDbColumns = {
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

  /* istanbul ignore next */
  function format(records, keysMap) {
    if (records) return records.map((record) => renameKeys(record, keysMap));
  }

  /* istanbul ignore next */
  function nest(posts, rootPostId) {
    let nestedRoot = {};
    /* istanbul ignore else */
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
      data: format(result.data, dbColumnsToNormalizedPost),
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

  async function update(updateDetails) {
    let result = await dbClient
      .from("posts")
      .update({ ...renameKeys(updateDetails, normalizedPostToDbColumns) })
      .eq("id", updateDetails.id);
    return { ...result };
  }
  async function remove(postId, userId) {
    let result = await dbClient
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("fk_uid", userId)
      .select();
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedPost),
    };
  }
  async function insert(insertDetails) {
    let result = await dbClient
      .from("posts") // TODO: Add .env for "posts"
      .insert({ ...renameKeys(insertDetails, normalizedPostToDbColumns) })
      .select();
    return {
      ...result,
      data: format(result.data, dbColumnsToNormalizedPost),
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
