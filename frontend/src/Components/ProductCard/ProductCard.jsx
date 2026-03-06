import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../../Services/api";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  // Check if product already exists in cart
  const checkCart = async () => {
    try {
      const res = await API.get("/cart");
      const exists = res.data.items.some(
        (item) => item.product._id === product._id
      );
      setInCart(exists);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWishlist = async () => {
  try {
    const res = await API.get("/products/wishlist");

    const exists = res.data.some(
      (item) => item._id === product._id
    );

    setWishlisted(exists);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    checkCart(),
    checkWishlist();
  }, []);

  
  const handleAddToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      toast.success("Added to cart");
      setInCart(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login required"
      );
    }
  };
  const handleWishlist = async (e) => {
  e.stopPropagation();

  try {
    const res = await API.post(`/products/wishlist/${product._id}`);

    toast.success(res.data.message);

    setWishlisted(!wishlisted);
  } catch (error) {
    toast.error(error.response?.data?.message || "Login required");
  }
  };
  return (
    <div  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-2 transition duration-300">
      
      <div className="relative">

  <img
    onClick={() => navigate(`/product/${product._id}`)}
    src={`http://localhost:3000/${product.images?.[0] || product.image}`}
    alt={product.name}
    className="w-full h-60 object-cover cursor-pointer"
  />

  {/* Wishlist button */}
  <button
    onClick={handleWishlist}
    className="absolute top-3 right-3 text-2xl bg-white/80 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition"
  >
    {wishlisted ? "❤️" : "🤍"}
  </button>

</div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">
          {product.name}
        </h3>

        <p className="text-slate-400 text-sm mb-4">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-cyan-400 font-bold text-xl">
            ₹{product.price}
          </span>
          
          {inCart ? (
            <button
              onClick={() => navigate("/cart")}
              className="bg-green-500 px-4 py-2 rounded-lg text-black font-semibold hover:scale-105 transition"
            >
              Go To Cart
            </button>
          ) : (
            
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg text-black font-semibold hover:scale-105 transition"
            >
              Add
            </button>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
