import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import OrderCard from "../Components/OrderCard/OrderCard.jsx";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center">
        My Orders
      </h2>

      {loading ? (
        <p className="text-center text-slate-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-slate-400">
          No orders yet
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;