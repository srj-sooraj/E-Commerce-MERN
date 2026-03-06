import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./connection.js";
import authRoutes from "./routes/authRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js";
import adminMiddleware from "./middleware/adminMiddleware.js";
import productRoutes from "./routes/productRoutes.js"

import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce API is running...");
});

app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});

app.get("/api/admin-test", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Admin route working" });
});

connection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });