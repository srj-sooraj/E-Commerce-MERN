import { useEffect, useState } from "react";
import API from "../Services/api";
import { useAuth } from "../Components/Context/AuthContext.jsx";
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
    // formData.append("house", form.house);
    // formData.append("street", form.street);
    // formData.append("city", form.city);
    // formData.append("state", form.state);
    // formData.append("pincode", form.pincode);

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
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="bg-white text-black w-96 p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          My Profile
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={
              preview
                ? preview
                : "https://i.pravatar.cc/150?img=3"
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-slate-300"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded-lg"
        />

        <h3 className="font-semibold mt-4">Address</h3>

        <input name="house" value={form.house} onChange={handleChange} placeholder="House" className="w-full border p-2 rounded-lg" />
        <input name="street" value={form.street} onChange={handleChange} placeholder="Street" className="w-full border p-2 rounded-lg" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full border p-2 rounded-lg" />
        <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full border p-2 rounded-lg" />
        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border p-2 rounded-lg" />

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Update Profile
          </button>

        </form>

        <form onSubmit={handleAddAddress}>
          <input name="house" onChange={handleChange} />
          <input name="street" onChange={handleChange} />
          <input name="city" onChange={handleChange} />
          <input name="state" onChange={handleChange} />
          <input name="pincode" onChange={handleChange} />

          <button type="submit">Add Address</button>
        </form>
        <hr className="my-6" />

        <h3 className="text-lg font-bold mb-3">Saved Addresses</h3>

        {user?.addresses?.length === 0 && (
          <p className="text-gray-500">No addresses added yet</p>
        )}

        {user?.addresses?.map((addr) => (
          <div key={addr._id} className="border p-3 rounded-lg mb-3">

            <p>{addr.house}, {addr.street}</p>
            <p>{addr.city}, {addr.state} - {addr.pincode}</p>

            {addr.isDefault && (
              <span className="text-green-600 text-sm font-semibold">
                Default Address
              </span>
            )}

            <div className="flex gap-3 mt-2">
              {!addr.isDefault && (
                <button
                  className="text-blue-600"
                  onClick={() => handleSetDefault(addr._id)}
                >
                  Set Default
                </button>
              )}

              <button
                className="text-red-500"
                onClick={() => handleDelete(addr._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;