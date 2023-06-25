export default function cdnGenerator(extension) {
  return Object.freeze({
    imgCdn: process.env.VITE_SUPABASE_BASE_CDN_URL + extension,
  });
}
