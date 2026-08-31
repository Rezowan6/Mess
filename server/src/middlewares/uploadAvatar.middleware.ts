import multer from "multer";

const storage = multer.memoryStorage();

export const uploadAvatar = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 1,
  },

  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
    ]);

    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }

    cb(null, true);
  },
});