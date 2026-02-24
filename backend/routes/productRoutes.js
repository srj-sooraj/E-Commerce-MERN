import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  toggleWishlist,
  getWishlist
  
} from "../controllers/productController.js";
const router = express.Router();

router.post("/", authMiddleware, adminMiddleware,upload.single("image"), addProduct);
router.get("/", getProducts);

router.post("/wishlist/:id", authMiddleware, toggleWishlist);
router.get("/wishlist", authMiddleware, getWishlist);

router.get("/:id", getSingleProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.post("/:id/reviews", authMiddleware, createReview);

export default router;