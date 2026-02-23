import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import ProductCard from "../Components/ProductCard/ProductCard.jsx";

const Product = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const res = await API.post("/cart", { productId, quantity: 1 });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding to cart");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

    {/* Hero Section */}
    <section className="text-center py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-950">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Discover Amazing Products
      </h1>
      <p className="text-slate-400 text-lg">
        Premium quality. Best prices. Lightning fast delivery.
      </p>
    </section>

    {/* Products Grid */}
    <div className="max-w-7xl mx-auto px-6 py-12">
      {products.length === 0 ? (
        <p className="text-center text-slate-400">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Product;