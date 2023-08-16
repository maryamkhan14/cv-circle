export default function buildMakeImagesDb({ dbClient }) {
  return Object.freeze({
    insert,
    remove: () => {}, //TODO: Implement remove
  });

  async function insert({ extension, imageData }) {
    return await dbClient.storage.from("avatars").upload(extension, imageData, {
      contentType: "image/png",
      upsert: true,
    }); //TODO: Add .env for "images", make contentType dynamic?
  }
}
