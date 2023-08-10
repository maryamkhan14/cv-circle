const { faker } = require("@faker-js/faker");

const FAKE_USER_ID = faker.number.bigInt(100000000000000000000n);
const FAKE_USER_NAME = faker.person.fullName();
const FAKE_USER_EMAIL = faker.internet.email();
const FAKE_USER_PROFILE_PIC = faker.image.avatar();
const FAKE_USER_VOTE_HISTORY = { upvotes: [], downvotes: [] };

export function makeFakeUser(overrides) {
  let userId =
    overrides && overrides.hasOwnProperty("userId")
      ? overrides.userId
      : FAKE_USER_ID;
  let name =
    overrides && overrides.hasOwnProperty("name")
      ? overrides.name
      : FAKE_USER_NAME;
  let email =
    overrides && overrides.hasOwnProperty("email")
      ? overrides.email
      : FAKE_USER_EMAIL;
  let profilePic =
    overrides && overrides.hasOwnProperty("profilePic")
      ? overrides.profilePic
      : FAKE_USER_PROFILE_PIC;
  let voteHistory =
    overrides && overrides.hasOwnProperty("voteHistory")
      ? overrides.voteHistory
      : FAKE_USER_VOTE_HISTORY;
  const user = {
    getUserId: () => userId,
    getName: () => name,
    getEmail: () => email,
    getProfilePic: () => profilePic,
    getVoteHistory: () => voteHistory,
    getDTO: () => {
      return {
        userId,
        name,
        email,
        profilePic,
        voteHistory,
      };
    },
  };

  return user;
}

export function makeFakeRawUser(overrides) {
  const user = {
    userId: FAKE_USER_ID,
    email: FAKE_USER_EMAIL,
    name: FAKE_USER_NAME,
    profilePic: FAKE_USER_PROFILE_PIC,
    voteHistory: FAKE_USER_VOTE_HISTORY,
  };
  return { ...user, ...overrides };
}
