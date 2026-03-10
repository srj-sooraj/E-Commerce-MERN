import React, { useEffect, useState } from "react";
import API from "../../Services/api";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { Package, User, Mail, CreditCard, CalendarDays, ChevronDown, CheckCircle2, Clock, Truck, XCircle, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await API.put(`/orders/${orderId}`, {
        orderStatus: status, 
      });
      toast.success(res.data.message || "Order updated", {
        style: { borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid #1e293b' },
      });
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Shipped': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Delivered': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle2 size={16} />;
      case 'Cancelled': return <XCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin")}
              className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center text-slate-300 transition-colors border border-slate-700"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Package size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Order Management
              </h2>
              <p className="text-slate-400">View and update customer orders</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300">
            <Settings size={16} /> Total Orders: {orders.length}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="min-h-[40vh] bg-slate-900/40 backdrop-blur-xl border border-slate-800 border-dashed rounded-[2rem] flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-800/50">
              <Package size={40} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Orders Found</h3>
            <p className="text-slate-400 max-w-sm mb-8">
              Your store doesn't have any orders yet.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={order._id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col relative overflow-hidden group hover:border-slate-700 transition-all"
                >
                  {/* Subtle top border glow based on status */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${order.orderStatus === 'Delivered' ? 'bg-emerald-500' : order.orderStatus === 'Processing' ? 'bg-yellow-400' : order.orderStatus === 'Shipped' ? 'bg-blue-500' : 'bg-red-500'}`} />

                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-800">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                        Order <span className="text-slate-400 font-mono text-sm">#{order._id.slice(-8)}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays size={14} /> {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    <div className="relative">
                      <select
                        className={`appearance-none pl-8 pr-10 py-2 rounded-xl text-sm font-bold border outline-none cursor-pointer transition-all ${getStatusColor(order.orderStatus)} hover:brightness-110`}
                        value={order.orderStatus}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                        <option value="Shipped" className="bg-slate-900 text-white">Shipped</option>
                        <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                        <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                      </select>
                      <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${getStatusColor(order.orderStatus).split(" ")[0]}`}>
                        {getStatusIcon(order.orderStatus)}
                      </div>
                      <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 ${getStatusColor(order.orderStatus).split(" ")[0]}`} />
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                    <div className="flex items-start gap-3">
                      <div className="bg-slate-800 p-2 rounded-lg text-slate-400 border border-slate-700">
                        <User size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-slate-500 font-semibold mb-0.5">Customer</p>
                        <p className="text-sm font-bold text-white truncate">{order.user ? order.user.name : "Deleted User"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-slate-800 p-2 rounded-lg text-slate-400 border border-slate-700">
                        <Mail size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-slate-500 font-semibold mb-0.5">Contact</p>
                        <p className="text-sm font-medium text-slate-300 truncate">{order.user ? order.user.email : "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 mb-6 max-h-48">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2 sticky top-0 bg-slate-900/90 backdrop-blur-md py-1 z-10">Items</p>
                    {order.items.map((item) => (
                      <div key={item._id} className="flex gap-4 items-center bg-slate-800/30 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group/item">
                        <div className="w-12 h-12 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                          {item.product && (item.product.images?.[0] || item.product.image) ? (
                            <img
                              src={`http://localhost:3000/${item.product.images?.[0] || item.product.image}`}
                              alt={item.name}
                              className="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 transition-opacity"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{item.product ? item.name : "Deleted Product"}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity} × <span className="font-semibold text-slate-300">₹{item.price}</span></p>
                        </div>
                        <div className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 whitespace-nowrap">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Stats */}
                  <div className="mt-auto pt-6 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                      <CreditCard size={18} className="text-cyan-400" /> Total Amount
                    </div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      ₹{order.totalAmount.toLocaleString()}
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

export default AdminOrders;