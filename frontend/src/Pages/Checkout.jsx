import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  // ✅ Correct cart structure
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Use backend calculated total
  const totalPrice = cart.totalAmount;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.postalCode
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const { data } = await api.post("/orders", {
        shippingAddress: address,
      });

      navigate(`/order-success/${data._id}`);
    } catch (error) {
  console.log(error.response);
  alert(error.response?.data?.message);
}
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Shipping Form */}
        <div className="bg-black p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="addressLine"
            placeholder="Address"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-black p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between border-b py-2"
            >
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>
                ₹ {item.product.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>₹ {totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 mt-4 rounded hover:bg-gray-800"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;