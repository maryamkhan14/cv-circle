const { faker } = require("@faker-js/faker");

const FAKE_USER_ID = 1;
const FAKE_USER_NAME = faker.person.fullName();
const FAKE_USER_EMAIL = faker.internet.email();
const FAKE_USER_PROFILE_PIC = faker.image.avatar();

export function makeFakeUser(overrides) {
  const user = {
    getUserId: () =>
      overrides && overrides.hasOwnProperty("userId")
        ? overrides.userId
        : FAKE_USER_ID,
    getName: () =>
      overrides && overrides.hasOwnProperty("name")
        ? overrides.name
        : FAKE_USER_NAME,
    getEmail: () =>
      overrides && overrides.hasOwnProperty("email")
        ? overrides.email
        : FAKE_USER_EMAIL,
    getProfilePic: () =>
      overrides && overrides.hasOwnProperty("profilePic")
        ? overrides.profilePic
        : FAKE_USER_PROFILE_PIC,
  };

  return user;
}

export function makeFakeRawUser(overrides) {
  const user = {
    userId: FAKE_USER_ID,
    email: FAKE_USER_EMAIL,
    name: FAKE_USER_NAME,
    profilePic: FAKE_USER_PROFILE_PIC,
  };
  return { ...user, ...overrides };
}
