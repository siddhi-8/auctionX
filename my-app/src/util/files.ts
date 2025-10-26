// src/lib/utils.ts (or wherever your function is)

import { env } from "@/env";

export function getImageUrl(fileKey: string) {
  // Use the NEW public variable
  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${fileKey}`;
}