export default function makeIsolateProfileDetails() {
  return function isolateProfileDetails({ id, displayName, emails, photos }) {
    return {
      userId: id,
      name: displayName,
      email: emails[0].value,
      profilePic: photos[0].value,
    };
  };
}
