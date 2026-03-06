import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import CartCard from "../Components/Cart/CartCard.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
      toast.success("Cart updated");
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
      toast.success("Item removed");
    } catch (error) {
      toast.error("Remove failed");
    } finally {
      setLoadingId(null);
    }
  };

  // const placeOrder = async () => {
  //   try {
  //     setPlacingOrder(true);
  //     const res = await API.post("/orders");
  //     toast.success(res.data.message);
  //     fetchCart();
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Order failed");
  //   } finally {
  //     setPlacingOrder(false);
  //   }
  // };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center">Your Cart</h2>

      {cart.items.length === 0 ? (
        <p className="text-center text-slate-400 text-lg">
          Your cart is empty
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">

          {cart.items.map((item) => (
            <CartCard
              key={item.product._id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              loading={loadingId === item.product._id}
            />
          ))}

          <div className="bg-slate-900 p-6 rounded-2xl flex justify-between items-center mt-10 shadow-lg">
            <h3 className="text-2xl font-semibold">Total:</h3>
            <span className="text-cyan-400 text-2xl font-bold">
              ₹{cart.totalAmount}
            </span>
          </div>

          <div className="text-center mt-6">
            {/* <button
              onClick={placeOrder}
              disabled={placingOrder}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3 rounded-xl text-black font-bold hover:scale-105 transition disabled:opacity-50"
            >
              {placingOrder ? "Processing..." : "Place Order"}
            </button> */}
            <button
              onClick={() => navigate("/checkout")}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3 rounded-xl text-black font-bold hover:scale-105 transition"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
