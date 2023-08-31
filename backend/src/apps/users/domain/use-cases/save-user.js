import makeUser from "../entities/user/index.js";
export default function makeSaveUser({ usersDb }) {
  return async function saveUser({ ...profileDetails }, onlyUpdate = false) {
    const user = makeUser({ ...profileDetails });
    let data;
    let error;
    if (onlyUpdate) {
      ({ data, error } = await usersDb.update({
        ...user.getDTO(),
      }));
    } else {
      ({ data, error } = await usersDb.upsert({
        ...user.getDTO(),
      }));
    }
    if (error) {
      throw new Error(`User could not be saved: ${error.message}`);
    }
    if (!data) {
      throw new Error("User details could not be retrieved");
    }
    const savedUser = makeUser({ ...data[0] });
    return savedUser;
  };
}
