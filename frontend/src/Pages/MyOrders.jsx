import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import OrderCard from "../Components/OrderCard/OrderCard.jsx";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { PackageOpen, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto flex flex-col items-center mb-12 relative z-10"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
          <PackageOpen size={32} className="text-slate-950" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Order History</h2>
        <p className="text-slate-400 mt-2 text-center max-w-md">Track the status of your recent purchases and view your order details.</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-center text-slate-400 font-medium tracking-wide">Fetching your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-[40vh] bg-slate-900/40 backdrop-blur-xl border border-slate-800 border-dashed rounded-[2rem] flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-800/50">
              <Clock size={40} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Orders Yet</h3>
            <p className="text-slate-400 max-w-sm mb-8">
              Looks like you haven't made any purchases yet. Start exploring our collections.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-bold rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 group"
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
