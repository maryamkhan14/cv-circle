export default function cdnGenerator(extension) {
  let currentImageURL = new URL(process.env.DB_BASE_CDN_URL + extension);
  currentImageURL.searchParams.set("t", Date.now());
  return currentImageURL.toString();
}
