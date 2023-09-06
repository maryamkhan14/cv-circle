import makeUser from "../entities/user/index.js";
export default function makeRetrieveUser({ usersDb }) {
  return async function retrieveUser(userId) {
    let { data, error } = await usersDb.getById(userId);
    if (error) {
      throw new Error(`User could not be retrieved: ${error.message}`);
    }
    if (!data) {
      throw new Error("No such user exists.");
    }
    const retrievedUser = makeUser({ ...data[0] });

    return retrievedUser.getDTO();
  };
}
