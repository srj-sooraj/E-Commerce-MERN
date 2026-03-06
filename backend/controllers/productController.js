import Product from "../models/product.js";
import User from "../models/User.js";

// ADD PRODUCT (Admin)
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const images = req.files.map(file => `uploads/${file.filename}`);

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL PRODUCTS
// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };
  export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const sortOption = req.query.sort || "newest";

    let sortBy = {};
    if (sortOption === "low") sortBy = { price: 1 };
    else if (sortOption === "high") sortBy = { price: -1 };
    else sortBy = { createdAt: -1 };

    const products = await Product.find({
      ...keyword,
      ...category,
    })
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({
      ...keyword,
      ...category,
    });

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE PRODUCT (Admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    if (req.files && req.files.length > 0) {
      product.images = req.files.map(file => `uploads/${file.filename}`);
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// DELETE PRODUCT (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return res.status(400).json({ message: "Already reviewed" });
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ message: "Review added" });
};
export const toggleWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);

  const productId = req.params.id;

  const exists = user.wishlist.includes(productId);

  if (exists) {
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );
  } else {
    user.wishlist.push(productId);
  }

  await user.save();

  res.json({ message: "Wishlist updated" });
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.wishlist);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: "Server error" });
  }
};