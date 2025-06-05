import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'campaign-covers',
      transformation: [
        { width: 1200, height: 800, crop: 'fill', gravity: 'auto' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (file: string) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'coach-profiles',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading profile picture to Cloudinary:', error);
    throw error;
  }
};

export const getOptimizedImageUrl = (url: string) => {
  return cloudinary.url(url, {
    fetch_format: 'auto',
    quality: 'auto',
    width: 1200,
    height: 800,
    crop: 'fill',
    gravity: 'auto'
  });
};

export default cloudinary; 