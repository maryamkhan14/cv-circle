/* istanbul ignore file */
export default function makeVerifyUser({ saveUser, isolateProfileDetails }) {
  return function (accessToken, refreshToken, profile, done) {
    let strippedProfile = isolateProfileDetails(profile);
    saveUser(strippedProfile).then((user) => done(null, user));
  };
}
