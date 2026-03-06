import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Package, ShieldCheck, User, LogOut, Menu, X, LayoutDashboard, Home as HomeIcon } from "lucide-react";
import defaultImg from "../../../images/user.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, userInfo, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Products", path: "/products", icon: Package },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "Orders", path: "/orders", icon: LayoutDashboard },
  ];

  if (userInfo?.role === "admin") {
    navLinks.push({ name: "Admin", path: "/admin", icon: ShieldCheck });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-slate-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5 py-3"
          : "bg-slate-950 py-5 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300 border border-white/10">
            <span className="text-xl font-bold text-slate-900 tracking-tighter">X</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Shop<span className="text-emerald-400">X</span>
          </h1>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative group flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: isActive ? "#fff" : "#94a3b8" }}
              >
                <Icon size={16} className={`transition-colors ${isActive ? "text-emerald-400" : "group-hover:text-emerald-400/70"}`} />
                <span className="group-hover:text-white transition-colors">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  />
                )}
              </Link>
            )
          })}

          {token ? (
            <div className="relative pl-4 border-l border-slate-800">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src={userInfo?.profilePic ? `http://localhost:3000${userInfo.profilePic}` : defaultImg}
                alt="profile"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-emerald-400/50 transition-all object-cover"
              />
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-56 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5 bg-slate-800/20">
                      <p className="text-sm font-semibold text-white truncate">{userInfo?.name || "User"}</p>
                      <p className="text-xs text-slate-400 truncate">{userInfo?.email || "No email"}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
                      >
                        <User size={16} /> My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="pl-4 border-l border-slate-800">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-slate-950 border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${isActive ? "bg-slate-900 text-white" : "text-slate-400 hover:text-white"}`}
                  >
                    <link.icon size={18} className={isActive ? "text-emerald-400" : ""} />
                    {link.name}
                  </Link>
                );
              })}

              <div className="border-t border-slate-800/50 pt-4 mt-2">
                {token ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-xl mb-2">
                      <img
                        src={userInfo?.profilePic ? `http://localhost:3000${userInfo.profilePic}` : defaultImg}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400/20"
                      />
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-white truncate">{userInfo?.name || "User"}</p>
                        <p className="text-xs text-slate-400 truncate">{userInfo?.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-slate-300 hover:text-white p-2"
                    >
                      <User size={18} /> My Account
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                      className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 p-2 rounded-lg w-full text-left transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 py-3 rounded-xl font-bold mt-2 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;