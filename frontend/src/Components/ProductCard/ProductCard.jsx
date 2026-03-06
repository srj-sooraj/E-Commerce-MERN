import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Services/api";
import toast from "react-hot-toast";
import { ShoppingBag, ShoppingCart, Heart, Star } from "lucide-react";

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
      const exists = res.data.some((item) => item._id === product._id);
      setWishlisted(exists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCart();
    checkWishlist();
  }, []);

  const handleAddToCart = async () => {
    try {
      await API.post("/cart", { productId: product._id, quantity: 1 });
      toast.success("Added to cart", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
      setInCart(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login required");
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();
    try {
      const res = await API.post(`/products/wishlist/${product._id}`);
      toast.success(res.data.message, {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
      setWishlisted(!wishlisted);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login required");
    }
  };

  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500">

      <div className="relative overflow-hidden aspect-[4/3] bg-slate-800">
        <img
          onClick={() => navigate(`/product/${product._id}`)}
          src={`http://localhost:3000/${product.images?.[0] || product.image}`}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${wishlisted
              ? "bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              : "bg-slate-900/60 text-white border border-white/10 hover:bg-white/20"
            }`}
        >
          <Heart size={20} className={wishlisted ? "fill-current" : ""} />
        </button>

        {/* Rating badge */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 flex items-center gap-1.5 z-10">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">4.8</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3
            onClick={() => navigate(`/product/${product._id}`)}
            className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto border-t border-slate-800/50 pt-5">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase mb-1">Price</span>
            <span className="text-emerald-400 font-extrabold text-2xl tracking-tight">
              ₹{product.price}
            </span>
          </div>

          {inCart ? (
            <button
              onClick={() => navigate("/cart")}
              className="bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-700 transition duration-300 border border-slate-700 shadow-lg"
            >
              <ShoppingBag size={18} /> Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 px-5 py-3 rounded-2xl font-bold flex items-center gap-2 transition duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform active:scale-95"
            >
              <ShoppingCart size={18} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
