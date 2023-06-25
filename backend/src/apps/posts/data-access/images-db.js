export default function buildMakeImagesDb({ dbClient, makeImage }) {
  return Object.freeze({
    insert,
    remove: () => {}, //TODO: Implement remove
  });

  async function insert({ extension, imageData }) {
    return await dbClient.storage.from("images").upload(extension, imageData); //TODO: Add .env for "images"
  }
}
