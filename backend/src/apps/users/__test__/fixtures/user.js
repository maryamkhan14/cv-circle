const { faker } = require("@faker-js/faker");

const FAKE_USER_ID = faker.number.bigInt(100000000000000000000n);
const FAKE_USER_NAME = faker.person.fullName();
const FAKE_USER_EMAIL = faker.internet.email();
const FAKE_USER_PROFILE_PIC = faker.image.avatar();
const FAKE_USER_VOTE_HISTORY = { upvotes: [], downvotes: [] };
const FAKE_USER_DISPLAY_NAME = FAKE_USER_NAME;
const FAKE_USER_LINKEDIN = faker.internet.url();
const FAKE_USER_TWITTER = faker.internet.url();
const FAKE_USER_BIO = faker.lorem.paragraph();

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
  let displayName =
    overrides && overrides.hasOwnProperty("displayName")
      ? overrides.displayName
      : FAKE_USER_DISPLAY_NAME;
  let linkedin =
    overrides && overrides.hasOwnProperty("linkedin")
      ? overrides.linkedin
      : FAKE_USER_LINKEDIN;
  let twitter =
    overrides && overrides.hasOwnProperty("twitter")
      ? overrides.twitter
      : FAKE_USER_TWITTER;
  let bio = overrides && overrides.hasOwnProperty("bio") ? overrides.bio : bio;
  const user = {
    getUserId: () => userId,
    getName: () => name,
    getEmail: () => email,
    getProfilePic: () => profilePic,
    getVoteHistory: () => voteHistory,
    getDisplayName: () => displayName,
    getLinkedin: () => linkedin,
    getTwitter: () => twitter,
    getBio: () => bio,
    getDTO: () => {
      return {
        userId,
        name,
        email,
        profilePic,
        voteHistory,
        displayName,
        linkedin,
        twitter,
        bio,
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
