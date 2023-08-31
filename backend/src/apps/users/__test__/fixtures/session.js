const { faker } = require("@faker-js/faker");
import { makeFakeRawUser } from "./user";

const FAKE_SESSION_ID = faker.string.nanoid(32);
const FAKE_ORIGINAL_MAX_AGE = 86400;
const FAKE_EXPIRES = faker.date.future();
const FAKE_SECURE = faker.datatype.boolean();
const FAKE_HTTP_ONLY = faker.datatype.boolean();
const FAKE_PATH = faker.internet.url();
const FAKE_SAME_SITE = faker.datatype.boolean();
export default function makeFakeSession(overrides) {
  const user = makeFakeRawUser();
  const cookie = {
    originalMaxAge: FAKE_ORIGINAL_MAX_AGE,
    expires: FAKE_EXPIRES,
    secure: FAKE_SECURE,
    httpOnly: FAKE_HTTP_ONLY,
    path: FAKE_PATH,
    sameSite: FAKE_SAME_SITE,
  };
  const sessionId = overrides?.sessionId || FAKE_SESSION_ID;
  const session = { sessionId, cookie, user, ...overrides };
  return session;
}
