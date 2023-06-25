export default function buildUsersDb({ dbClient }) {
  return Object.freeze({ upsert });
  async function upsert({ userId, name, email, profilePic }) {
    return await dbClient
      .from("users")
      .upsert({
        uid: userId,
        name,
        email,
        profilepic: profilePic,
      })
      .select();
  }
}
