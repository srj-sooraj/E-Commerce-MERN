import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import ProductCard from "../Components/ProductCard/ProductCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronRight, Package } from "lucide-react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await API.get(
        `/products?page=${page}&keyword=${keyword}&category=${category}&sort=${sort}`
      );

      setProducts(data.products);
      setPages(data.pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, keyword, category, sort]);

  const addToCart = async (productId) => {
    try {
      const res = await API.post("/cart", { productId, quantity: 1 });
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding to cart");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden py-10">

      {/* SHOP SECTION */}
      <div id="shop-section" className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16 pt-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            All Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Explore our wide range of products carefully selected to meet your everyday needs with uncompromising quality.
          </motion.p>
        </div>

        {/* CATEGORIES SECTION */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {["All", "Electronics", "Clothing", "Accessories", "Home", "Sports"].map((cat) => {
            const isActive = category === cat || (cat === "All" && category === "");
            return (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat === "All" ? "" : cat);
                  setPage(1);
                }}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 backdrop-blur-md ${isActive
                  ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  : "bg-slate-900/50 text-slate-400 border border-white/5 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* SEARCH & FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-16 p-4 bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl"
        >
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search for amazing products..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:bg-slate-900 transition-all outline-none placeholder:text-slate-500 text-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="appearance-none pl-6 pr-12 py-4 h-full rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none w-full sm:w-48 text-base font-medium cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-6 pr-12 py-4 h-full rounded-2xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 outline-none w-full sm:w-48 text-base font-medium cursor-pointer"
              >
                <option value="newest">Latest Arrivals</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-90" size={18} />
            </div>
          </div>
        </motion.div>

        {/* PRODUCTS GRID */}
        {products.length === 0 ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-slate-400">
            <Package size={64} className="opacity-20" />
            <p className="text-xl">No products found matching your criteria</p>
            <button
              onClick={() => { setKeyword(""); setCategory(""); }}
              className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index % 4 * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* PAGINATION */}
        {pages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            {[...Array(pages).keys()].map((x) => (
              <button
                key={x + 1}
                onClick={() => { setPage(x + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all ${page === x + 1
                  ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  }`}
              >
                {x + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Product;
