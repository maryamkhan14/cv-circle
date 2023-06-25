export default function makeVerifyUser({ saveUser, isolateProfileDetails }) {
  return function (accessToken, refreshToken, profile, done) {
    saveUser(isolateProfileDetails(profile)).then((user) => done(null, user));
  };
}
