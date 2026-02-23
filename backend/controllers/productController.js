import Product from "../models/product.js";

// ADD PRODUCT (Admin)
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
      image: `uploads/${req.file.filename}`
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

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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