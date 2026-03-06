import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

// CREATE ORDER (Dummy Payment) - already exists


export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // ✅ Remove deleted products automatically
    cart.items = cart.items.filter(item => item.product !== null);
    await cart.save();

    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (let item of cart.items) {
      const product = item.product;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`
        });
      }

      // Deduct stock
      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentStatus: "Pending"
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      _id: order._id
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
    const { orderStatus } = req.body; // ✅ FIXED

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus; // ✅ direct assign
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};