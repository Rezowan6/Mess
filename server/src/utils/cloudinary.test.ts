import cloudinary from "@/configs/cloudinary.js";

export const testCloudinaryConnection = async () => {
  try {
    const result = await cloudinary.api.ping();

    console.log("✅ Cloudinary connected successfully");
    return result;
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error);
    throw error;
  }
};
