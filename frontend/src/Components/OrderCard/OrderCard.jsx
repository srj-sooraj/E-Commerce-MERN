import { Package, Truck, CheckCircle2, Clock, MapPin, CreditCard, ExternalLink, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {

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

  const steps = ['Processing', 'Shipped', 'Delivered'];
  let currentStepIndex = steps.indexOf(order.orderStatus);
  if (order.orderStatus === 'Cancelled') currentStepIndex = -1;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-slate-800 transition-colors">

      {/* Background Glow based on status */}
      <div className={`absolute -right-20 -top-20 w-40 h-40 blur-[80px] rounded-full opacity-20 pointer-events-none transition-all ${order.orderStatus === 'Delivered' ? 'bg-emerald-500' :
          order.orderStatus === 'Processing' ? 'bg-yellow-500' :
            order.orderStatus === 'Shipped' ? 'bg-blue-500' : 'bg-red-500'
        }`} />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4 border-b border-slate-800/50 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-extrabold text-xl text-white tracking-tight">
              Order <span className="text-emerald-400">#{order._id.slice(-8)}</span>
            </h4>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.orderStatus)}`}>
              {getStatusIcon(order.orderStatus)}
              {order.orderStatus}
            </div>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Amount</p>
          <span className="text-2xl font-black text-white">
            ₹{order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Timeline Status tracker */}
      {order.orderStatus !== 'Cancelled' && (
        <div className="relative mb-8 px-4 sm:px-10 hidden sm:block z-10">
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-800 -translate-y-1/2 rounded-full" />
          <div className="absolute top-1/2 left-10 h-1 bg-emerald-500 -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }} />

          <div className="flex justify-between relative">
            {steps.map((step, idx) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-900 bg-slate-950 z-10 transition-colors ${idx <= currentStepIndex ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'text-slate-600 border-slate-800'}`}>
                  {idx === 0 ? <Clock size={16} /> : idx === 1 ? <Truck size={16} /> : <CheckCircle2 size={16} />}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${idx <= currentStepIndex ? 'text-emerald-400' : 'text-slate-600'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="grid md:grid-cols-2 gap-4 mb-8 z-10 relative">
        {order.items.map((item, index) => {
          if (!item.product) return null;

          return (
            <div key={index} className="flex gap-4 p-4 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-800 rounded-2xl transition-all">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
                <img
                  src={`http://localhost:3000/${item.product.images?.[0] || item.product.image
                    }`}
                  alt={item.name}
                  className="w-full h-full object-cover p-1 opacity-90"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <h5 className="font-bold text-white text-base truncate pr-4">{item.name}</h5>
                <p className="text-slate-400 text-sm mt-1">
                  Qty: <span className="font-semibold text-white">{item.quantity}</span> × ₹{(item.price).toLocaleString()}
                </p>
                <div className="mt-2 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 w-fit text-xs">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-slate-800/50 gap-4 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={14} className="text-cyan-400" />
            <span className="font-medium text-slate-300">Shipping location provided securely</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <CreditCard size={14} className="text-emerald-400" />
            <span className="font-medium text-slate-300">Payment Processed Successfully</span>
          </div>
        </div>

        <Link to={`/`} className="text-emerald-400 hover:text-emerald-300 text-sm font-bold flex items-center gap-1 group/link">
          Buy these again <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
};

export default OrderCard;