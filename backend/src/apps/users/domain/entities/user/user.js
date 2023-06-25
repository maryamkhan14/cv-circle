export default function buildMakeUser() {
  return function makeUser({ userId, name, email, profilePic } = {}) {
    if (!userId) throw new Error("User must have an ID.");
    if (!name) throw new Error("User must have a name.");
    if (!email) throw new Error("User must have an email.");
    if (!profilePic) throw new Error("User must have a profile picture.");

    return Object.freeze({
      getUserId: () => userId,
      getName: () => name,
      getEmail: () => email,
      getProfilePic: () => profilePic,
      getDTO: () => {
        return {
          userId,
          name,
          email,
          profilePic,
        };
      },
    });
  };
}
