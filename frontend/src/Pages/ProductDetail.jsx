import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Services/api";
const ProductDetails = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
  const fetchProduct = async () => {
    const { data } = await API.get(`/products/${id}`);

    setProduct(data);

    const firstImage = data.images?.length
      ? data.images[0]
      : data.image;

    setSelectedImage(`http://localhost:3000/${firstImage}`);
  };

  fetchProduct();
}, [id]);

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: qty,
      });
      alert("Added to cart");
    } catch (error) {
      alert("Error adding to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

const images = product.images?.length ? product.images : [product.image];

  const submitReview = async () => {
  try {
    await API.post(`/products/${id}/reviews`, {
      rating,
      comment,
    });

    alert("Review submitted");
    window.location.reload();
  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

    
      <div className="flex gap-6">

          {/* Thumbnails */}
          
          <div className="flex flex-col gap-3">

            <div className="flex flex-col gap-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/${img}`}
                  className="w-16 h-16 object-cover border cursor-pointer rounded"
                  onClick={() =>
                    setSelectedImage(`http://localhost:3000/${img}`)
                  }
                />
              ))}
            </div>

            </div>
          {/* Main Image */}
         <img
            src={selectedImage || `http://localhost:3000/${images[0]}`}
            alt={product.name}
            className="rounded-lg w-[450px] object-cover"
          />

        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-slate-400 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold mb-2">₹{product.price}</p>

          <hr className="my-4 border-slate-700" />

          {/* PRODUCT EXTRA DETAILS */}

          <p className="text-slate-400">
            Category: <span className="text-white">{product.category}</span>
          </p>

          <p className="text-slate-400">
            Rating: ⭐ {product.rating} / 5
          </p>

          <p className="text-slate-400 mb-4">
            Reviews: {product.numReviews}
          </p>

          <p className={`mb-4 ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
            Stock: {product.stock > 0 ? "Available" : "Out of stock"}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 px-2 py-1 bg-slate-800 rounded"
            />
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
            <hr className="my-10 border-slate-700" />

        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {product.reviews?.map((rev) => (
          <div key={rev._id} className="bg-slate-800 p-4 rounded mb-4">
            <p className="font-semibold">{rev.name}</p>
            <p>⭐ {rev.rating}</p>
            <p className="text-slate-400">{rev.comment}</p>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-xl mb-2">Write a Review</h3>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="bg-slate-800 px-3 py-2 rounded mb-3"
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full bg-slate-800 p-3 rounded mb-3"
          />

          <button
            onClick={submitReview}
            className="bg-yellow-500 px-6 py-2 rounded text-black font-semibold"
          >
            Submit Review
          </button>
        </div>
                </div>
              </div>
            </div>
          );
        };

 export default ProductDetails;
