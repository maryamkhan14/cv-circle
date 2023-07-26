export default function cdnGenerator(extension) {
  return process.env.DB_BASE_CDN_URL + extension;
}
