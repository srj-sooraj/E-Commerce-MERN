import { useEffect, useState } from "react";
import API from "../Services/api";
import { useAuth } from "../Components/Context/AuthContext.jsx";
import { motion } from "framer-motion";
import { User, Mail, Phone, Home, Map, MapPin, Camera, Save, Trash2, CheckCircle2, MapPinHouse } from "lucide-react";

const Profile = () => {
  const { updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/profile/me");
      setUser(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone || "",
        house: res.data.address?.house || "",
        street: res.data.address?.street || "",
        city: res.data.address?.city || "",
        state: res.data.address?.state || "",
        pincode: res.data.address?.pincode || "",
      });

      if (res.data.profilePic) {
        setPreview(`http://localhost:3000${res.data.profilePic}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // instant preview
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);

      if (image) {
        formData.append("profilePic", image);
      }

      const res = await API.put("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      // ✅ THIS IS THE FIX
      updateUser(res.data.user);

      fetchUser();

    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/profile/address", {
        house: form.house,
        street: form.street,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        isDefault: false,
      });

      updateUser(res.data);
      setUser(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/profile/address/${id}`);
      updateUser(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleSetDefault = async (id) => {
    try {
      const res = await API.put(`/profile/address/default/${id}`);
      updateUser(res.data);
      setUser(res.data);  // refresh local state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto flex flex-col items-center mb-12"
      >
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
          <User size={32} className="text-slate-950" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Your Profile</h2>
        <p className="text-slate-400 mt-2">Manage your account and addresses</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 relative z-10">

        {/* Profile Details Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl space-y-8 h-fit"
        >
          <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <img
                src={preview ? preview : "https://i.pravatar.cc/150?img=3"}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-slate-800 relative z-10 group-hover:border-emerald-500/50 transition-colors"
              />
              <label className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full cursor-pointer text-slate-950 hover:bg-emerald-400 transition-colors z-20 shadow-lg">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{form.name || "User"}</h3>
              <p className="text-slate-400 text-sm">{form.email}</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
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
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Save size={18} /> Update Profile
            </motion.button>
          </form>
        </motion.div>

        {/* Address Management Segment */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          {/* Add New Address */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
              <MapPinHouse className="text-emerald-400" /> Add New Address
            </h2>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="house" onChange={handleChange} placeholder="House / Flat" className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600" />
                <input name="street" onChange={handleChange} placeholder="Street" className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="city" onChange={handleChange} placeholder="City" className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600" />
                <input name="state" onChange={handleChange} placeholder="State" className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600" />
              </div>
              <input name="pincode" onChange={handleChange} placeholder="Pincode" className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-600" />

              <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-700">
                <MapPin size={18} /> Save Address
              </button>
            </form>
          </div>

          {/* Saved Addresses List */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
              <Map className="text-emerald-400" /> Saved Addresses
            </h3>

            {user?.addresses?.length === 0 ? (
              <p className="text-slate-500 text-center py-4">No addresses added yet</p>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {user?.addresses?.map((addr) => (
                  <div key={addr._id} className={`p-5 rounded-2xl border ${addr.isDefault ? "bg-emerald-500/5 border-emerald-500/50 relative" : "bg-slate-950/50 border-slate-800"} transition-all`}>

                    {addr.isDefault && (
                      <div className="absolute top-4 right-4 text-emerald-400 flex items-center gap-1 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
                        <CheckCircle2 size={14} /> Default
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Home size={18} className="text-slate-500 mt-1 shrink-0" />
                      <div>
                        <p className="text-white font-medium">{addr.house}, {addr.street}</p>
                        <p className="text-slate-400 text-sm mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4 pt-4 border-t border-slate-800/50 pl-7">
                      {!addr.isDefault && (
                        <button
                          className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                          onClick={() => handleSetDefault(addr._id)}
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        className="text-sm font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                        onClick={() => handleDelete(addr._id)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;