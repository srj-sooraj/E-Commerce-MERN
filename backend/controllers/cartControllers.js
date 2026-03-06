import Product from "../models/product.js";
import Cart from "../models/cart.js";
// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({
        items: [],
        totalAmount: 0
      });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      if (!item.product) return acc; 
      return acc + item.product.price * item.quantity;
    }, 0);
    cart.items = cart.items.filter(item => item.product !== null);

    res.status(200).json({
      items: cart.items,
      totalAmount
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// UPDATE CART ITEM QUANTITY
// export const updateCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     let cart = await Cart.findOne({ user: req.user._id });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const itemIndex = cart.items.findIndex(
//       item => item.product.toString() === productId
//     );

//     if (itemIndex === -1) {
//       return res.status(404).json({ message: "Product not in cart" });
//     }

//     cart.items[itemIndex].quantity = quantity;

//     await cart.save();

//     res.status(200).json({
//       message: "Cart updated successfully",
//       cart
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


  export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// REMOVE ITEM FROM CART
// export const removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     let cart = await Cart.findOne({ user: req.user._id });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     cart.items = cart.items.filter(
//       item => item.product.toString() !== productId
//     );

//     await cart.save();

//     res.status(200).json({
//       message: "Product removed from cart",
//       cart
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};