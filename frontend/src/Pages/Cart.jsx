import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import CartCard from "../Components/Cart/CartCard.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, CreditCard, Lock } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loadingId, setLoadingId] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (productId, change) => {
    try {
      const item = cart.items.find(i => i.product._id === productId);
      const newQuantity = item.quantity + change;

      if (newQuantity < 1) return;

      setLoadingId(productId);

      await API.put("/cart", {
        productId,
        quantity: newQuantity
      });

      await fetchCart();
      toast.success("Cart updated", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoadingId(null);
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoadingId(productId);
      await API.delete(`/cart/${productId}`);
      await fetchCart();
      toast.success("Item removed", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
    } catch (error) {
      toast.error("Remove failed");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-4 mb-12"
      >
        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
          <ShoppingBag className="text-emerald-400" size={24} />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Your Cart</h2>
      </motion.div>

      {cart.items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-[50vh] text-slate-400 gap-6"
        >
          <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mb-2">
            <ShoppingBag size={40} className="text-slate-600" />
          </div>
          <p className="text-xl font-medium text-slate-300">Your cart is feeling a bit empty</p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Start Shopping
          </button>
        </motion.div>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">

          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cart.items.map((item) => (
                <CartCard
                  key={item.product._id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  loading={loadingId === item.product._id}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[350px] shrink-0"
          >
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-2xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-emerald-400" />
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 text-sm text-slate-300">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({cart.items.length} items)</span>
                  <span className="font-semibold text-white">₹{cart.totalAmount}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Shipping Estimate</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Tax Estimate</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-slate-800/50 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                    ₹{cart.totalAmount}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-4 pt-4 border-t border-slate-800/50 text-center flex justify-center gap-2">
                <Lock size={14} className="text-slate-500" />
                <span className="text-xs text-slate-500 font-medium">Secure Encrypted Checkout</span>
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
};

export default Cart;
