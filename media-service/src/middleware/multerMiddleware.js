// import multer from "multer";

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   },
// }).single("file");

// export { upload };

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
