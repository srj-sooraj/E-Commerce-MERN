import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../Services/api";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowLeft, Send, CheckCircle2, ChevronRight, Package, Tag } from "lucide-react";

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

  if (!product) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-white/5 py-4 px-6 sm:px-10 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <ArrowLeft size={16} /> Home
          </Link>
          <ChevronRight size={14} />
          <span className="hover:text-emerald-400 transition-colors cursor-pointer">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-12 relative z-10 grid lg:grid-cols-2 gap-12 items-start">

        {/* Images Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col-reverse sm:flex-row gap-6 lg:sticky lg:top-32"
        >
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto w-full sm:w-24 custom-scrollbar snap-x pb-2 sm:pb-0 sm:max-h-[500px]">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(`http://localhost:3000/${img}`)}
                className={`snap-center shrink-0 w-20 h-20 sm:w-20 sm:h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === `http://localhost:3000/${img}` ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border-slate-800 hover:border-slate-600"}`}
              >
                <img
                  src={`http://localhost:3000/${img}`}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl group flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
            <img
              src={selectedImage || `http://localhost:3000/${images[0]}`}
              alt={product.name}
              className="w-full object-contain max-h-[500px] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/20 text-emerald-400 w-fit mb-4">
            <Tag size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">{product.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/20">
              <Star size={16} className="fill-yellow-500" />
              {product.rating} <span className="text-yellow-500/70 font-medium">/ 5</span>
            </div>
            <p className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer border-b border-slate-700 hover:border-slate-400 pb-0.5">
              Read {product.numReviews} Reviews
            </p>
          </div>

          <p className="text-4xl font-extrabold text-emerald-400 mt-8 tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            ₹{product.price}
          </p>

          <p className="text-slate-400 mt-6 text-lg leading-relaxed border-t border-slate-800/50 pt-6">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-b border-slate-800/50 py-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-400">Quantity</span>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden p-1 shadow-inner h-[52px]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 font-bold"
                >-</button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-12 text-center bg-transparent border-none focus:outline-none focus:ring-0 text-white font-bold h-full appearance-none m-0"
                  style={{ MozAppearance: 'textfield' }}
                />
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 font-bold"
                >+</button>
              </div>
            </div>

            <div className="flex-1 w-full pt-6 sm:pt-0">
              <motion.button
                whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
                whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
                onClick={addToCart}
                disabled={product.stock === 0}
                className={`w-full h-[52px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${product.stock > 0
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-slate-950 mt-7 sm:mt-7"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed mt-7 sm:mt-7"
                  }`}
              >
                <ShoppingCart size={20} />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </motion.button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-6">
            <div className={`flex items-center gap-2 text-sm font-medium ${product.stock > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {product.stock > 0 ? <CheckCircle2 size={18} /> : <Package size={18} />}
              {product.stock > 0 ? "In Stock & Ready to Ship" : "Currently Unavailable"}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-24 relative z-10 grid lg:grid-cols-3 gap-12 items-start border-t border-slate-800 pt-16">

        <div className="lg:col-span-1 sticky top-32">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            Customer Reviews
          </h2>
          <p className="text-slate-400 mb-8">See what others are saying or add your own thoughts.</p>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-xl">
            <h3 className="text-xl font-bold mb-4 font-sans text-white border-b border-slate-800 pb-2">Write a Review</h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Rating</label>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-800 text-white p-3 pl-10 rounded-xl focus:border-emerald-500/50 outline-none appearance-none"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 Star - Poor</option>
                    <option value="2">2 Stars - Fair</option>
                    <option value="3">3 Stars - Good</option>
                    <option value="4">4 Stars - Very Good</option>
                    <option value="5">5 Stars - Excellent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-1 block">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows="4"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white p-3 rounded-xl focus:border-emerald-500/50 outline-none resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submitReview}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2"
              >
                Submit Review <Send size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {product.reviews?.length === 0 ? (
            <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-[2rem] p-12 text-center flex flex-col items-center">
              <Star className="text-slate-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Reviews Yet</h3>
              <p className="text-slate-400 max-w-sm">Be the first to review this product and share your thoughts with other customers.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {product.reviews?.map((rev, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={rev._id}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 rounded-[2rem] shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4 border-b border-slate-800/50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-emerald-400 border border-slate-700">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-tight">{rev.name}</p>
                        <p className="text-xs text-slate-500 font-medium tracking-wide border bg-slate-800 border-slate-700 rounded-full px-2 py-0.5 inline-block mt-1">Verified Buyer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md text-xs font-bold border border-yellow-500/20">
                      <Star size={12} className="fill-yellow-500" /> {rev.rating}/5
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
