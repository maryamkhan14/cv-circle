export default function makeSaveUser({ usersDb, makeUser }) {
  return async function saveUser({ ...profileDetails }) {
    const user = makeUser({ ...profileDetails });
    let { data, error } = await usersDb.upsert({
      ...user.getDTO(),
    });
    if (error) {
      throw new Error("User could not be saved: ", error.message);
    }
    if (!data) {
      throw new Error("User details could not be retrieved");
    }
    const savedUser = makeUser({ ...data[0] });

    return savedUser;
  };
}
