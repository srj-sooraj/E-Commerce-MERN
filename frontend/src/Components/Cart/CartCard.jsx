import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

const CartCard = ({ item, updateQuantity, removeItem, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300"
    >

      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          <img
            src={`http://localhost:3000/${item.product.images?.[0] || item.product.image
              }`}
            alt={item.product.name}
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl border border-white/10 relative z-10"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{item.product.name}</h3>
          <p className="text-emerald-400 font-semibold text-lg drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">₹{item.product.price}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full md:w-auto gap-6 sm:gap-12">
        <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
          <button
            onClick={() => updateQuantity(item.product._id, -1)}
            disabled={loading || item.quantity <= 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 transition-colors"
          >
            <Minus size={16} />
          </button>

          <span className="text-lg font-bold w-12 text-center flex-shrink-0 text-white">
            {loading ? "..." : item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.product._id, 1)}
            disabled={loading}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex items-center sm:flex-col items-end gap-3 w-full sm:w-auto justify-between sm:justify-center border-t border-slate-800/50 sm:border-none pt-4 sm:pt-0 mt-2 sm:mt-0">
          <span className="text-emerald-400 font-extrabold text-2xl tracking-tight">
            ₹{item.product.price * item.quantity}
          </span>

          <button
            onClick={() => removeItem(item.product._id)}
            disabled={loading}
            className="flex items-center gap-2 text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-40"
          >
            <Trash2 size={16} /> Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartCard;