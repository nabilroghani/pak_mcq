/** Normalize Vite string URLs and Next.js StaticImageData imports. */
export function imgSrc(asset) {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  if (typeof asset === "object" && asset.src) return asset.src;
  return "";
}
