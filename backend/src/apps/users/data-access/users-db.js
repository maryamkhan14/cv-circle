export default function buildUsersDb({ dbClient }) {
  return Object.freeze({ upsert, update, remove });

  async function update({
    userId,
    email,
    profilePic,
    displayName,
    linkedin,
    twitter,
    bio,
  }) {
    let result = await dbClient
      .from("users")
      .update({
        email,
        avatar: profilePic,
        display_name: displayName,
        linkedin,
        twitter,
        bio,
      })
      .eq("uid", userId)
      .select(
        "userId:uid, name, email, profilePic:avatar, voteHistory:users_votes_view(upvoted, downvoted), displayName:display_name, linkedin, twitter, bio"
      );
    return { ...result, data: formatProfile(result.data) };
  }
  async function upsert({ userId, name, email, profilePic }) {
    let result = await dbClient
      .from("users")
      .upsert({
        uid: userId,
        name,
        email,
        profile_pic: profilePic,
      })
      .select(
        "userId:uid, name, email, profilePic:profile_pic, voteHistory:users_votes_view(upvoted, downvoted), displayName:display_name, avatar, linkedin, twitter, bio"
      );
    return { ...result, data: formatProfile(result.data) };
  }
  async function remove(userId) {
    let result = await dbClient
      .from("users")
      .delete()
      .eq("uid", userId)
      .select(
        "userId:uid, name, email, profilePic:profile_pic, voteHistory:users_votes_view(upvoted, downvoted), displayName:display_name, avatar, linkedin, twitter, bio"
      );
    return { ...result, data: formatProfile(result.data) };
  }
  function formatVoteHistory(voteHistory) {
    return {
      upvoted: voteHistory[0]?.upvoted || [],
      downvoted: voteHistory[0]?.downvoted || [],
    };
  }
  function formatProfile(data) {
    if (data && data?.length) {
      const [profile] = data;
      return [
        {
          ...profile,
          voteHistory: formatVoteHistory(profile?.voteHistory || []),
          profilePic: profile.avatar ? profile.avatar : profile.profilePic,
        },
      ];
    }
  }
}
