'use server'

import { auth } from "@/auth";
import { database } from "@/db/Database";
import { items } from "@/db/schema";
import { env } from "@/env";
import { v2 as cloudinary } from 'cloudinary';
import { redirect } from "next/navigation";

// Configure Cloudinary with your credentials from the validated env object
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

// The createUploadUrl function is no longer needed with this direct upload approach
// export async function createUploadUrl(key: string) { ... }

export async function createItemActions(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const user = session.user;
  if (!user || !user.id) {
    throw new Error("User not found in session");
  }

  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const startingPrice = parseFloat(formData.get("startingPrice") as string);
  
  if (!file || file.size === 0) {
    throw new Error("An image file is required.");
  }
  
  // 1. Convert the file to a buffer to prepare for upload
  const fileBuffer = await file.arrayBuffer();

  // 2. Upload the file buffer to Cloudinary
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'auction-items' }, // Optional: organize uploads into a folder
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    ).end(Buffer.from(fileBuffer));
  });

  // 3. Prepare data for the database, including the new image URL
  const priceAsMoney = Math.floor(startingPrice * 100);

  // 4. Insert the new item into your database
  await database.insert(items).values({
    name: name,
    startingPrice: priceAsMoney,
    imageUrl: uploadResult.secure_url, // <-- Save the Cloudinary URL
    userId: user.id,
  });

  redirect("/");
}
