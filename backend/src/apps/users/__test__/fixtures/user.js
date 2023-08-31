const { faker } = require("@faker-js/faker");

const FAKE_USER_ID = faker.string.numeric(21);
const FAKE_USER_NAME = faker.person.fullName();
const FAKE_USER_EMAIL = faker.internet.email();
const FAKE_USER_PROFILE_PIC = faker.image.avatar();
const FAKE_USER_VOTE_HISTORY = { upvoted: [], downvoted: [] };
const FAKE_USER_DISPLAY_NAME = FAKE_USER_NAME;
const FAKE_USER_LINKEDIN = faker.internet.url();
const FAKE_USER_TWITTER = faker.internet.url();
const FAKE_USER_BIO = faker.lorem.paragraph();

export function makeFakeUser(overrides) {
  let userId = overrides?.userId || FAKE_USER_ID;
  let name = overrides?.name || FAKE_USER_NAME;
  let email = overrides?.email || FAKE_USER_EMAIL;
  let profilePic = overrides?.profilePic || FAKE_USER_PROFILE_PIC;
  let voteHistory = overrides?.voteHistory || FAKE_USER_VOTE_HISTORY;
  let displayName = overrides?.displayName || FAKE_USER_DISPLAY_NAME;
  let linkedin = overrides?.linkedin || FAKE_USER_LINKEDIN;
  let twitter = overrides?.twitter || FAKE_USER_TWITTER;
  let bio = overrides?.bio || FAKE_USER_BIO;
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
    name: FAKE_USER_NAME,
    email: FAKE_USER_EMAIL,
    profilePic: FAKE_USER_PROFILE_PIC,
    voteHistory: FAKE_USER_VOTE_HISTORY,
    displayName: FAKE_USER_DISPLAY_NAME,
    linkedin: FAKE_USER_LINKEDIN,
    twitter: FAKE_USER_TWITTER,
    bio: FAKE_USER_BIO,
  };
  return { ...user, ...overrides };
}
