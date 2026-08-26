import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "uploads/avatars");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(
      null,
      `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`,
    );
  },
});

export const uploadAvatar = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG and WEBP images are allowed"));
    }

    cb(null, true);
  },
});