import express from "express";
import upload from "../utils/uploadMulter.js"
import { uploadImage } from "../controllers/uploadController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("image"),
  authMiddleware.verifyToken,
  uploadImage,
);

export default router;
