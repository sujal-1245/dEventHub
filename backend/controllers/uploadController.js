import path from "path";
import multer from "multer";

// Storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer middleware
export const upload = multer({ storage });

// @desc Upload image
// @route POST /api/upload
// @access Private (admin)
export const uploadImage = (req, res) => {
  console.log("📂 File uploaded:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // URL to access the file
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ url: fileUrl });
};
