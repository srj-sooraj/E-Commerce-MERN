import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ShoppingCart, ArrowRight } from "lucide-react";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/products/wishlist");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeWishlist = async (id, e) => {
    e.stopPropagation();
    try {
      await API.post(`/products/wishlist/${id}`);
      toast.success("Removed from wishlist", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
      fetchWishlist();
    } catch (error) {
      toast.error("Error modifying wishlist");
    }
  };

  const addToCart = async (id, e) => {
    e.stopPropagation();
    try {
      await API.post("/cart", {
        productId: id,
        quantity: 1,
      });

      toast.success("Added to cart", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
    } catch (error) {
      toast.error("Login required or error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto flex flex-col items-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
          <Heart size={32} className="text-slate-950 fill-slate-950" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Your Wishlist</h2>
        <p className="text-slate-400 mt-2">Saved items that you love</p>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-[40vh] text-slate-400 gap-6"
          >
            <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mb-2 shadow-inner">
              <Heart size={40} className="text-slate-600" />
            </div>
            <p className="text-xl font-medium text-slate-300">Your wishlist is currently empty</p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 group"
            >
              Explore Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {products.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 cursor-pointer hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={`http://localhost:3000/${item.images?.[0] || item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <button
                      onClick={(e) => removeWishlist(item._id, e)}
                      className="absolute top-3 right-3 w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-400 hover:text-red-400 hover:bg-slate-800 transition-colors z-20 shadow-lg border border-white/10"
                    >
                      <Heart size={20} className="fill-current text-current" />
                    </button>
                  </div>

                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">{item.name}</h3>
                    <p className="text-emerald-400 font-extrabold text-xl mb-4 tracking-tight">₹{item.price}</p>

                    <div className="mt-auto pt-4 border-t border-slate-800 flex justify-center">
                      <button
                        onClick={(e) => addToCart(item._id, e)}
                        className="w-full bg-slate-800 hover:bg-emerald-500 text-white hover:text-slate-950 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn border border-slate-700 hover:border-emerald-500"
                      >
                        <ShoppingCart size={18} />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;