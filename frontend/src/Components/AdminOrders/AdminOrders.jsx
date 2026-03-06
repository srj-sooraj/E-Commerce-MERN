import React, { useEffect, useState } from "react";
import API from "../../Services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

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
        orderStatus: status, // IMPORTANT: match backend field name
      });
      alert(res.data.message);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 border p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📦 Admin Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No Orders Found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 border rounded-xl shadow-md p-6 border"
            >
              {/* Order Info */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Order ID: {order._id}
                </p>

                <p className="font-semibold text-lg">
                  👤 {order.user ? order.user.name : "Deleted User"}
                </p>

                {order.user && (
                  <p className="text-sm text-gray-600">
                    {order.user.email}
                  </p>
                )}

                <p className="mt-2 font-medium">
                  💰 Total: ₹{order.totalAmount}
                </p>
              </div>

              {/* Items */}
              <div className="mb-4">
                <p className="font-semibold mb-2">Items:</p>
                <ul className="space-y-1">
                  {order.items.map((item) => (
                    <li
                      key={item._id}
                      className="text-sm text-gray-700"
                    >
                      {item.product
                        ? item.product.name
                        : "Deleted Product"}{" "}
                      × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status Section */}
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold">
                  Status: {order.orderStatus}
                </span>

                <select
                  className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-900 border"
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;