import makeImage from "../entities/image/index.js";
export default function makeHandlePicture({ imagesDb }) {
  return async function handlePicture({ file, userId, extension }) {
    if (file) {
      let image;
      let imageData = file.data;
      image = makeImage({ imageData, userId, extension });

      let { error } = await imagesDb.insert({
        imageData: image.getImageData(),
        extension: image.getExtension(),
      });
      if (error) {
        throw new Error(
          `Error uploading image preview to database: ${error.message}. Post creation failed.`
        );
      }
      return image;
    }
  };
}
