// src/app/items/create/actions.ts

'use server'

import { auth } from "@/auth";
import { database } from "@/db/Database";
import { items } from "@/db/schema";
import { env } from "@/env";
import { v2 as cloudinary } from 'cloudinary';
import { redirect } from "next/navigation";

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

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
  
  // 1. Upload file
  const fileBuffer = await file.arrayBuffer();
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'auction-items' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(Buffer.from(fileBuffer));
  });

  // 2. Prepare data
  const priceAsMoney = Math.floor(startingPrice * 100);

  // 3. Set an end date (e.g., 7 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  // 4. Insert into database
  await database.insert(items).values({
    name: name,
    startingPrice: priceAsMoney,
    fileKey: uploadResult.public_id,
    userId: user.id,
    endDate: endDate, // <-- THIS IS THE FIX
  });

  redirect("/");
}