export default function buildUsersDb({ dbClient }) {
  return Object.freeze({ upsert });

  async function upsert({ userId, name, email, profilePic }) {
    let result = await dbClient
      .from("users")
      .upsert({
        uid: userId,
        name,
        email,
        profilepic: profilePic,
      })
      .select(
        "userId:uid, name, email, profilePic:profilepic, voteHistory:users_votes_view(upvoted, downvoted)"
      );
    return {
      ...result,
      data: [
        {
          ...result.data[0],
          voteHistory: formatVoteHistory(result.data[0]?.voteHistory || []),
        },
      ],
    };
  }
  function formatVoteHistory(voteHistory) {
    return {
      upvoted: voteHistory[0]?.upvoted || [],
      downvoted: voteHistory[0]?.downvoted || [],
    };
  }
}
