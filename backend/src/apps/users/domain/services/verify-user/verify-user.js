export default function makeVerifyUser({
  saveUser,
  isolateProfileDetails,
  updateUsersTopic,
}) {
  return function (accessToken, refreshToken, profile, done) {
    let strippedProfile = isolateProfileDetails(profile);
    saveUser(strippedProfile).then((user) => {
      updateUsersTopic(user);
      done(null, user);
    });
  };
}
