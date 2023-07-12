export default function cdnGenerator(extension) {
  return Object.freeze({
    imgCdn: process.env.DB_BASE_CDN_URL + extension,
  });
}
