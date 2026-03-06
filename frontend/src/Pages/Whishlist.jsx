import React, { useEffect, useState } from "react";
import API from "../Services/api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/products/wishlist");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
    

  }, []);

  
  const removeWishlist = async (id, e) => {
    e.stopPropagation();
    try {
      await API.post(`/products/wishlist/${id}`);
      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch (error) {
      toast.error("Error");
    }
  };

 
  const addToCart = async (id, e) => {
    e.stopPropagation();
    try {
      await API.post("/cart", {
        productId: id,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error("Login required");
    }
  };

  const checkWishlist = async () => {
  try {
    const res = await API.get("/products/wishlist");
    const exists = res.data.some(
      (item) => item._id === product._id
    );
    setWishlisted(exists);
  } catch (error) {
    console.log(error);
  }
};

const toggleWishlist = async (id, e) => {
  e.stopPropagation();

  try {
    const res = await API.post(`/products/wishlist/${id}`);
    toast.success(res.data.message);

    fetchWishlist(); // refresh wishlist
  } catch (error) {
    toast.error("Login required");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h2 className="text-3xl font-bold mb-8">My Wishlist</h2>

      {products.length === 0 ? (
        <p className="text-slate-400">No products in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">

          {products.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="bg-slate-900 p-4 rounded-xl cursor-pointer hover:shadow-lg transition"
            >

              <img
                src={`http://localhost:3000/${item.images?.[0] || item.image}`}
                alt={item.name}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="mt-3 font-semibold">{item.name}</h3>
              <p className="text-cyan-400 font-bold">₹{item.price}</p>

              <div className="flex justify-between mt-3">

                <button
                  onClick={(e) => addToCart(item._id, e)}
                  className="bg-cyan-500 px-3 py-1 rounded text-black text-sm"
                >
                  Add Cart
                </button>

                <button
                  onClick={(e) => toggleWishlist(item._id, e)}
                  className="text-xl"
                >
                  {wishlisted ? "❤️" : "🤍"}
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;