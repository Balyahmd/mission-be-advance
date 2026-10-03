export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    res.status(201).json({
      message: "Image uploaded successfully",
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
};