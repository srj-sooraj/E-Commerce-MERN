import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

router.post("/create-order", async (req, res) => {

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment failed" });
  }

});

export default router;