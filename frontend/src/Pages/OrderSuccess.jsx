import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Services/api";
import { motion } from "framer-motion";
import { CheckCircle, Package, Home, CreditCard, ChevronRight, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-slate-900/80 backdrop-blur-2xl border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] rounded-[2rem] w-full max-w-3xl p-8 sm:p-12 relative z-10"
      >

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-10 pb-8 border-b border-slate-800">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-6"
          >
            <CheckCircle size={48} className="text-slate-950" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Payment Successful!
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            Thank you for your purchase. We've received your order and are currently processing it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          {/* Order Info */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-slate-300">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Package size={18} className="text-emerald-400" /> Order Details
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono text-emerald-400 font-medium truncate max-w-[120px]" title={order._id}>#{order._id.substring(0, 8)}...</span>
              </div>

              <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle size={14} /> {order.paymentStatus || "Paid"}
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-emerald-500/20">
                <span className="text-slate-400 font-medium">Total Paid:</span>
                <span className="font-extrabold text-lg text-white">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-slate-300">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Home size={18} className="text-cyan-400" /> Shipping To
            </h3>

            <div className="space-y-2 text-sm bg-slate-900 p-4 rounded-xl border border-slate-800/50">
              <p className="text-white font-bold text-base">{order.shippingAddress.fullName}</p>
              <p className="text-slate-400 flex items-center gap-2"><CreditCard size={14} /> {order.shippingAddress.phone}</p>
              <div className="mt-2 pt-2 border-t border-slate-800">
                <p className="text-slate-400">{order.shippingAddress.addressLine}</p>
                <p className="text-slate-400">
                  {order.shippingAddress.city} - <span className="text-white font-mono">{order.shippingAddress.postalCode}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items List Optional display */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/orders")}
            className="flex-1 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            <Package size={18} /> View Status
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> Continue Shopping
          </motion.button>

        </div>

      </motion.div>

    </div>
  );
};

export default OrderSuccess;