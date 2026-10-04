import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import * as courseController from "../controllers/courseController.js";

const router = Router()

router.get(
  "/courses",
  authMiddleware.verifyToken,
  courseController.getList
);

// router.get(
//   "/courses/:id",
//   authMiddleware.verifyToken,
//   courseController.getDetail
// );

// router.post(
//   "/courses",
//   authMiddleware.verifyToken,
//   courseController.create
// );

// router.patch(
//   "/courses/:id",
//   authMiddleware.verifyToken,
//   courseController.update
// );

// router.delete(
//   "/courses/:id",
//   authMiddleware.verifyToken,
//   courseController.remove
// );

export default router;