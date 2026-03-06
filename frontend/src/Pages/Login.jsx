import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";
import { useAuth } from "../Components/Context/AuthContext";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ChevronRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      login(res.data.token, res.data.user);

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-slate-900/60 backdrop-blur-xl p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/10 relative z-10"
      >

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <LogIn size={28} className="text-slate-950" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 tracking-tight">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-400 ml-1 mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
          >
            Sign In <ChevronRight size={18} className="lucide-chevron-right" />
          </motion.button>

        </form>

        <p className="text-center font-medium text-slate-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Register now
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Login;