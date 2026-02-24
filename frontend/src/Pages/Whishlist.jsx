import React, { useEffect, useState } from "react";
import API from "../Services/api";

const Wishlist = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      {products.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg">
              <img
                src={`http://localhost:3000/${item.image}`}
                alt={item.name}
                className="h-40 w-full object-cover"
              />
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;