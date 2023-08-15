export default function buildUsersDb({ dbClient }) {
  return Object.freeze({ upsert });

  async function upsert({
    userId,
    name,
    email,
    profilePic,
    displayName,
    linkedin,
    twitter,
    bio,
  }) {
    let result = await dbClient
      .from("users")
      .upsert({
        uid: userId,
        name,
        email,
        profile_pic: profilePic,
        display_name: displayName || name,
        linkedin,
        twitter,
        bio,
      })
      .select(
        "userId:uid, name, email, profilePic:profile_pic, voteHistory:users_votes_view(upvoted, downvoted), displayName:display_name, linkedin, twitter, bio"
      );
    console.log(result);
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
