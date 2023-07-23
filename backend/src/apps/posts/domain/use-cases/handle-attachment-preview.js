export default function makeHandleAttachmentPreview({
  imagesDb,
  makePdfPreview,
  makeImage,
}) {
  return async function handleAttachmentPreview({ file, userId, extension }) {
    let image;
    if (file.mimetype !== "application/pdf") {
      console.log("File is not a pdf. No conversion needed", file);
      let imageData = file.data;
      image = makeImage({ imageData, userId, extension });
    } else {
      let imageData = (await makePdfPreview(file)).get();
      image = makeImage({ imageData, userId, extension });
    }

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
  };
}
