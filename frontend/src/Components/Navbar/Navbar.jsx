import React from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer">
          ShopX
        </h1>

        {/* Links */}
        <div className="flex items-center gap-8 text-slate-300 font-medium">

          <Link
            to="/"
            className="hover:text-cyan-400 transition relative group"
          >
            Products
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            to="/cart"
            className="hover:text-cyan-400 transition relative group"
          >
            Cart
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
          </Link>
          <button onClick={() => navigate("/wishlist")}>
            Wishlist
          </button>
          <Link
            to="/orders"
            className="hover:text-cyan-400 transition relative group"
          >
            Orders
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
          </Link>

          {/* ✅ ADMIN LINK ADDED HERE */}
          {userInfo?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-cyan-400 transition relative group"
            >
              Admin
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
            </Link>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-lg text-white hover:scale-105 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-lg text-black font-semibold hover:scale-105 transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;