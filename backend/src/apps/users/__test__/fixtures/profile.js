const { faker } = require("@faker-js/faker");

const FAKE_USER_FAMILY_NAME = faker.person.lastName();
const FAKE_USER_GIVEN_NAME = faker.person.firstName();
const FAKE_USER_DISPLAY_NAME = faker.person.fullName({
  firstName: FAKE_USER_GIVEN_NAME,
  lastName: FAKE_USER_FAMILY_NAME,
});
const FAKE_USER_EMAIL = faker.internet.email({
  firstName: FAKE_USER_GIVEN_NAME,
  lastName: FAKE_USER_FAMILY_NAME,
});
const FAKE_USER_ID = faker.number.bigInt(100000000000000000000n);
const FAKE_USER_PROFILE_PIC = faker.image.avatar();

export default {
  id: FAKE_USER_ID,
  displayName: FAKE_USER_DISPLAY_NAME,
  name: { familyName: FAKE_USER_FAMILY_NAME, givenName: FAKE_USER_GIVEN_NAME },
  emails: [{ value: FAKE_USER_EMAIL, verified: true }],
  photos: [
    {
      value: FAKE_USER_PROFILE_PIC,
    },
  ],
  provider: "google",
  _raw:
    "{\n" +
    `  "sub": ${FAKE_USER_ID},\n` +
    `  "name": ${FAKE_USER_DISPLAY_NAME},\n` +
    `  "given_name": ${FAKE_USER_GIVEN_NAME},\n` +
    `  "family_name": ${FAKE_USER_FAMILY_NAME},\n` +
    `  "picture": ${FAKE_USER_PROFILE_PIC},\n` +
    `  "email": ${FAKE_USER_EMAIL},\n` +
    '  "email_verified": true,\n' +
    '  "locale": "en"\n' +
    "}",
  _json: {
    sub: "113235094836200975612",
    name: "Maryam Khan",
    given_name: "Maryam",
    family_name: "Khan",
    picture:
      "https://lh3.googleusercontent.com/a/AAcHTtfaTu1oxKoybUeKVqQS2qhZ4ACs6l2qfdAxi6yO7b8=s96-c",
    email: "kmaryam818@gmail.com",
    email_verified: true,
    locale: "en",
  },
};
