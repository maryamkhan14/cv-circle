export default function makeSaveUser({ usersDb, makeUser }) {
  return async function saveUser({ ...profileDetails }) {
    const user = makeUser({ ...profileDetails });
    let { error } = usersDb.upsert({
      userId: user.getUserId(),
      name: user.getName(),
      email: user.getEmail(),
      profilePic: user.getProfilePic(),
    });
    if (error) {
      throw new Error("User could not be saved: ", error.message);
    }
    return user;
  };
}
