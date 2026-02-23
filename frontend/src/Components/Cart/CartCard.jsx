import React from "react";

const CartCard = ({ item, updateQuantity, removeItem, loading }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg transition hover:scale-[1.02]">

      <div className="flex items-center gap-6 w-full md:w-auto">
        <img
        
          src={`http://localhost:3000/${item.product.image}`}
          alt={item.product.name}
          className="w-28 h-28 object-cover rounded-xl"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
          <p className="text-slate-400">₹{item.product.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-800 px-4 py-2 rounded-xl">
        <button
          onClick={() => updateQuantity(item.product._id, -1)}
          disabled={loading || item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
        >
          -
        </button>

        <span className="text-lg font-semibold w-6 text-center">
          {loading ? "..." : item.quantity}
        </span>

        <button
          onClick={() => updateQuantity(item.product._id, 1)}
          disabled={loading}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
        >
          +
        </button>
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="text-cyan-400 font-bold text-xl">
          ₹{item.product.price * item.quantity}
        </span>

        <button
          onClick={() => removeItem(item.product._id)}
          disabled={loading}
          className="text-red-500 hover:text-red-400 text-sm disabled:opacity-40"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;  