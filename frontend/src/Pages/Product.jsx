import React, { useEffect, useState } from "react";
import API from "../Services/api.js";
import ProductCard from "../Components/ProductCard/ProductCard.jsx";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1); // total pages
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
    <div className="min-h-screen bg-slate-950 text-white">

      {/* SEARCH  FILTER BAR */}
      <div className="flex flex-wrap gap-4 p-6 justify-center">
        
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded bg-slate-800"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded bg-slate-800"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded bg-slate-800"
        >
          <option value="newest">Newest</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {products.length === 0 ? (
          <p className="text-center text-slate-400">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center pb-10">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              page === x + 1
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Product;
