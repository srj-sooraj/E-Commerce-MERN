import express from "express";
import { addToCart, getCart,updateCartItem,removeFromCart } from "../controllers/cartControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/", authMiddleware, updateCartItem);
router.delete("/:productId", authMiddleware, removeFromCart);

export default router;