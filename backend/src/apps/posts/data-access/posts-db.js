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
    let formattedResults;
    let result = await dbClient
      .from("posts")
      .select()
      .order("created_at", { ascending: false });

    if (result.data) {
      formattedResults = result.data.map(
        ({
          id,
          created_at: createdAt,
          fk_uid: userId,
          title: title,
          post_content: postContent,
          img_cdn: imgCdn,
        }) => {
          return { id, createdAt, userId, title, postContent, imgCdn };
        }
      );
    }
    return { ...result, data: formattedResults };
  }
  async function getById(postId) {
    return await dbClient.from("posts").select().eq("id", postId);
  }
  async function update() {}
  async function remove() {}
  async function insert({ userId, title, postContent, imgCdn }) {
    let formattedResult;
    let result = await dbClient
      .from("posts") // TODO: Add .env for "posts"
      .insert({
        fk_uid: userId,
        title: title,
        post_content: postContent,
        img_cdn: imgCdn,
      })
      .select();

    if (result.data) {
      let {
        id,
        created_at: createdAt,
        fk_uid: userId,
        title,
        post_content: postContent,
        img_cdn: imgCdn,
      } = result.data;
      formattedResult = { id, createdAt, userId, title, postContent, imgCdn };
    }

    return {
      ...result,
      data: formattedResult,
    };
  }
}
