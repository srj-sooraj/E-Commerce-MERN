import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext"; // adjust path if needed
import defaultImg from "../../../images/user.png"

const Navbar = () => {
  const navigate = useNavigate();
  const { token, userInfo, logout } = useAuth(); // ✅ use context
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          ShopX
        </h1>

        <div className="flex items-center gap-8">

          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>

          {userInfo?.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}

          {token ? (
            <div className="relative">
              <img
                src={
                  userInfo?.profilePic
                    ? `http://localhost:3000${userInfo.profilePic}`
                    : defaultImg
                }
                alt="profile"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-800 rounded-lg p-2">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2"
                  >
                    My Account
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-cyan-400 px-4 py-2 rounded-lg">
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;