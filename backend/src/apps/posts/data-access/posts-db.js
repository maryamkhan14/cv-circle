export default function makePostsDb({ dbClient }) {
  // upvote, downvote not added yet
  return Object.freeze({
    getAll,
    getById,
    insert,
    update,
    remove,
  });

  async function getAll() {
    let result = await dbClient
      .from("posts")
      .select()
      .order("created_at", { ascending: false });

    return {
      ...result,
      data: result.data.map((record) => formatDbResults(record)),
    };
  }

  async function getById(postId) {
    let result = await dbClient.from("posts").select().eq("id", postId);
    return { ...result, data: formatDbResults(result.data) };
  }

  async function update() {}
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
      data: formatDbResults(result.data),
    };
  }

  function formatDbResults(data) {
    if (data) {
      let {
        id,
        created_at: createdAt,
        fk_uid: userId,
        title,
        post_content: postContent,
        img_cdn: imgCdn,
      } = data;
      return { id, createdAt, userId, title, postContent, imgCdn };
    }
    return null;
  }
}
