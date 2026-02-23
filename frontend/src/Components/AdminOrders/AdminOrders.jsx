import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders"); // Admin route
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await API.put(`/orders/${orderId}`, { status });
      alert(res.data.message);
      fetchOrders();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>All Orders (Admin)</h2>
      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p>Order ID: {order._id}</p>
            <p>User: {order.user.name} ({order.user.email})</p>
            <p>Status: {order.orderStatus}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.orderStatus}>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;