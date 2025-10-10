import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// This function handles POST requests to /api/upload
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('itemImage'); // 'itemImage' is the form field name

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Convert file to a buffer
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;

    // The upload logic is a bit different; we upload the buffer
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'auction-items',
          resource_type: 'auto',
          format: mimeType.split('/')[1] // e.g., 'png' or 'jpeg'
        },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      ).end(Buffer.from(fileBuffer));
    });

    return NextResponse.json({ imageUrl: result.secure_url });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}