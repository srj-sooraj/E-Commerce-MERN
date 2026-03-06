import express from "express";
import { getCurrentUser, updateUser,addAddress,deleteAddress,setDefaultAddress } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me",authMiddleware, getCurrentUser);
router.put("/update",authMiddleware, upload.single("profilePic"), updateUser);
router.post("/address",authMiddleware, addAddress);
router.delete("/address/:id",authMiddleware, deleteAddress);
router.put("/address/default/:id",authMiddleware, setDefaultAddress);

export default router;