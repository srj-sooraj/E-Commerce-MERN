import { useEffect, useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Home, Map, CreditCard, ShoppingBag, ShieldCheck } from "lucide-react";

const Checkout = () => {
  //Correct cart structure
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });

  const navigate = useNavigate();
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  useEffect(() => {
    fetchCart();
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const { data } = await api.get("/profile/me");
      if (data.addresses && data.addresses.length > 0) {
        setSavedAddresses(data.addresses);
        // Map the default or first address into the form just in case
        const defAddr = data.addresses.find(a => a.isDefault) || data.addresses[0];
        setAddress({
          fullName: data.name || "",
          phone: data.phone || "",
          addressLine: `${defAddr.house}, ${defAddr.street}`,
          city: defAddr.city,
          postalCode: defAddr.pincode,
        });
      }
    } catch (error) {
      console.log("Error fetching profile for checkout", error);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Use backend calculated total
  const totalPrice = cart.totalAmount;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {

    
    let addressPayload = address;

    if (useSavedAddress && savedAddresses.length > 0) {
      const selected = savedAddresses[selectedAddressIndex];
      addressPayload = {
        fullName: address.fullName || "User",
        phone: address.phone || "0000000000",
        addressLine: `${selected.house}, ${selected.street}`,
        city: selected.city,
        postalCode: selected.pincode
      };
    } else {
      if (
        !address.fullName ||
        !address.phone ||
        !address.addressLine ||
        !address.city ||
        !address.postalCode
      ) {
        alert("Please fill all fields or select a saved address.");
        return;
      }
    }

    try {

      // create razorpay order
      const { data: order } = await api.post("/payment/create-order", {
        amount: totalPrice,
      });

      const options = {
        key: "rzp_test_SNqAlbJufxoBmT",
        amount: order.amount,
        currency: "INR",
        name: "My E-commerce",
        description: "Order Payment",
        order_id: order.id,

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        handler: async function (response) {

          //create order in your DB after payment
          const { data } = await api.post("/orders", {
            shippingAddress: addressPayload,
          });

          navigate(`/order-success/${data._id}`);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto flex flex-col items-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
          <ShieldCheck size={32} className="text-slate-950" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Checkout</h2>
        <p className="text-slate-400 mt-2">Securely complete your order</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">

        {/* Shipping Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl h-fit"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="text-emerald-400" /> Shipping Details
            </h2>

            {savedAddresses.length > 0 && (
              <div className="flex items-center gap-2 text-sm bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                <button onClick={() => setUseSavedAddress(false)} className={`px-3 py-1.5 rounded-md font-bold transition-all ${!useSavedAddress ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>New</button>
                <button onClick={() => setUseSavedAddress(true)} className={`px-3 py-1.5 rounded-md font-bold transition-all ${useSavedAddress ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>Saved</button>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {useSavedAddress && savedAddresses.length > 0 ? (
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Select Address</h3>
                <div className="space-y-3">
                  {savedAddresses.map((addr, idx) => (
                    <div key={addr._id} onClick={() => setSelectedAddressIndex(idx)} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedAddressIndex === idx ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3 items-start">
                          <Home size={18} className={`mt-0.5 ${selectedAddressIndex === idx ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <div>
                            <p className="font-bold text-white">{addr.house}, {addr.street}</p>
                            <p className="text-sm text-slate-400 mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                          </div>
                        </div>
                        {selectedAddressIndex === idx && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><ShieldCheck size={12} className="text-slate-950" /></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-xs text-slate-500 mb-3">Ensure your contact details are correct</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input type="text" name="fullName" value={address.fullName} onChange={handleChange} placeholder="Full Name" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none text-white" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                      <input type="text" name="phone" value={address.phone} onChange={handleChange} placeholder="Phone" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      placeholder="Enter full name"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="phone"
                      value={address.phone}
                      placeholder="Enter phone number"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Address</label>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="addressLine"
                      value={address.addressLine}
                      placeholder="Enter full address"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">City</label>
                    <div className="relative">
                      <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        placeholder="City"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Postal Code</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        name="postalCode"
                        value={address.postalCode}
                        placeholder="Zip/Postal"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl flex flex-col h-fit sticky top-24"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
            <ShoppingBag className="text-emerald-400" /> Order Summary
          </h2>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 bg-slate-950/50 p-3 rounded-2xl border border-slate-800"
              >
                <img
                  src={`http://localhost:3000/${item.product.images?.[0] || item.product.image}`}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-white line-clamp-1">{item.product.name}</h4>
                  <p className="text-slate-400 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-400">₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <div className="flex justify-between items-center mb-2 text-slate-400">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-slate-400">
              <span>Shipping</span>
              <span className="text-emerald-400">Free</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-white mb-8 border-t border-slate-800 pt-4">
              <span>Total Payment</span>
              <span className="text-3xl text-emerald-400 tracking-tight">₹{totalPrice}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 py-4 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 text-lg"
            >
              <CreditCard size={20} />
              Pay Now (Razorpay)
            </motion.button>
            <p className="text-center text-xs text-slate-500 mt-4 flex justify-center items-center gap-1">
              <ShieldCheck size={14} /> Payments are 100% secure and encrypted.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;