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
    return await dbClient
      .from("posts")
      .select()
      .order("created_at", { ascending: false });
  }
  async function getById(postId) {
    return await dbClient.from("posts").select().eq("id", postId);
  }
  async function update() {}
  async function remove() {}
  async function insert({ userId, title, postContent, imgCdn }) {
    return await dbClient
      .from("posts") // TODO: Add .env for "posts"
      .insert({
        fk_uid: userId,
        title: title,
        post_content: postContent,
        img_cdn: imgCdn,
      })
      .select();
  }
}
