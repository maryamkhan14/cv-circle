import makeUser from "../entities/user/index.js";
export default function makeRemoveUser({ usersDb }) {
  return async function removeUser(userId) {
    let { data, error } = await usersDb.remove(userId);
    if (error) {
      throw new Error(`User could not be removed: ${error.message}`);
    }
    if (!data) {
      throw new Error("User details could not be retrieved.");
    }
    const removedUser = makeUser({ ...data[0] });

    return removedUser.getDTO();
  };
}
