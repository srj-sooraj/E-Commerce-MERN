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

        {/* Images Section (Flipkart Style Sticky Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 flex flex-col md:flex-row gap-6 sticky top-[120px] h-fit"
        >
          {/* Thumbnails (Vertical on desktop) */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 custom-scrollbar snap-x pb-2 md:pb-0 md:max-h-[600px] shrink-0">
            {images.map((img, index) => (
              <div
                key={index}
                onMouseEnter={() => setSelectedImage(`http://localhost:3000/${img}`)}
                onClick={() => setSelectedImage(`http://localhost:3000/${img}`)}
                className={`snap-center shrink-0 w-20 h-20 md:w-20 md:h-20 bg-slate-900 rounded-xl overflow-hidden cursor-pointer border-2 transition-all p-1 ${selectedImage === `http://localhost:3000/${img}` ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-slate-800" : "border-slate-800 hover:border-slate-600"}`}
              >
                <img
                  src={`http://localhost:3000/${img}`}
                  alt="Thumbnail"
                  className="w-full h-full object-contain mix-blend-screen"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] md:h-[600px] p-6 backdrop-blur-md">
            <img
              src={selectedImage || `http://localhost:3000/${images[0]}`}
              alt={product.name}
              className="w-full h-full object-contain max-h-[500px] group-hover:scale-110 transition-transform duration-700 ease-in-out cursor-crosshair drop-shadow-2xl"
            />
          </div>
        </motion.div>

        {/* Product Details Section (Flipkart Right Column) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col lg:col-span-3 text-slate-300"
        >
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{product.category}</div>

          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-sm font-bold shadow-sm">
              {Number(product.rating || 0).toFixed(1)} <Star size={14} className="fill-white" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {product.numReviews} Ratings & Reviews
            </p>
            <div className="w-1 h-1 bg-slate-600 rounded-full" />
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-5 filter invert opacity-80" />
          </div>

          <div className="text-emerald-400 font-black text-xs uppercase tracking-wider mb-1 mt-2">Special Price</div>
          <div className="flex items-end gap-3 mb-6 border-b border-slate-800/50 pb-6">
            <p className="text-4xl font-black text-white tracking-tight">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-xl text-slate-500 line-through font-medium mb-1">
              ₹{(product.price * 1.4).toFixed(0).toLocaleString()}
            </p>
            <p className="text-emerald-500 font-bold mb-1">28% off</p>
          </div>

          {/* Offers Section */}
          <div className="mb-6">
            <h4 className="font-bold text-white mb-3">Available Offers</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Tag size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><span className="font-bold text-white">Bank Offer</span> 10% off on HDFC Bank Credit Card EMI Transactions, up to ₹1,500 on orders of ₹5,000 and above <span className="text-cyan-400 font-semibold cursor-pointer">T&C</span></span>
              </li>
              <li className="flex items-start gap-2">
                <Tag size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><span className="font-bold text-white">Bank Offer</span> 5% Cashback on ShopX Axis Bank Card <span className="text-cyan-400 font-semibold cursor-pointer">T&C</span></span>
              </li>
              <li className="flex items-start gap-2">
                <Tag size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><span className="font-bold text-white">Special Price</span> Get extra 10% off (price inclusive of cashback/coupon) <span className="text-cyan-400 font-semibold cursor-pointer">T&C</span></span>
              </li>
            </ul>
          </div>

          {/* Highlights & Delivery */}
          <div className="grid sm:grid-cols-2 gap-8 mb-8 border-t border-slate-800/50 pt-8">
            <div>
              <div className="flex items-center gap-2 text-slate-400 font-semibold mb-2 uppercase text-xs tracking-wider">
                <Package size={14} className="text-cyan-400" /> Delivery
              </div>
              <p className="text-white font-medium mb-1 border-b border-white/10 pb-2 w-fit">Delivery by {new Date(Date.now() + 86400000 * 3).toLocaleDateString()} | <span className="text-emerald-400 font-bold">Free <span className="text-slate-500 line-through text-xs font-normal">₹40</span></span></p>
              <p className="text-xs text-slate-400">Order within 2hrs 30mins. Details</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-slate-400 font-semibold mb-2 uppercase text-xs tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400" /> Highlights
              </div>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                <li>Premium Quality Manufacturer</li>
                <li>7 Days Replacement Policy</li>
                <li>Cash on Delivery available</li>
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 border border-slate-800 rounded-xl p-6 bg-slate-900/30 shadow-inner">
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider border-b border-slate-800/50 pb-2">Product Description</h4>
            <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          {/* Buy Section */}
          <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 sticky bottom-4 backdrop-blur-xl shadow-2xl z-20">
            <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden p-1 shadow-inner h-[56px] shrink-0">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 font-bold"
              >-</button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-16 text-center bg-transparent border-none focus:outline-none focus:ring-0 text-white font-bold h-full appearance-none m-0 text-lg"
                style={{ MozAppearance: 'textfield' }}
              />
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 font-bold"
              >+</button>
            </div>

            <motion.button
              whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
              whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`flex-1 h-[56px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${product.stock > 0
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-950 text-lg shadow-[0_4px_15px_rgba(245,158,11,0.3)]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed text-lg"
                }`}
            >
              <ShoppingCart size={22} className={product.stock > 0 ? "fill-slate-950" : ""} />
              {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
            </motion.button>

            <motion.button
              whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
              whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
              disabled={product.stock === 0}
              className={`flex-1 h-[56px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${product.stock > 0
                ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 text-lg shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
                : "bg-slate-800 text-slate-500 cursor-not-allowed text-lg hidden"
                }`}
            >
              <Send size={20} />
              BUY NOW
            </motion.button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            {product.stock > 0 ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-red-500" />}
            Status: {product.stock > 0 ? <span className="text-emerald-400">In Stock ({product.stock} units)</span> : <span className="text-red-400">Sold Out</span>}
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
