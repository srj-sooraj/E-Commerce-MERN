import Order from "../models/order.js";
import Cart from "../models/cart.js";

// CREATE ORDER (Dummy Payment) - already exists
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount,
      paymentStatus: "Completed" // Dummy payment
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully (Dummy Payment)",
      order
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET USER ORDERS - already exists
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ NEW: ADMIN GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ NEW: ADMIN UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Processing", "Completed", "Cancelled"
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status || order.orderStatus;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};