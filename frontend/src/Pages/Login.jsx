import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";
import { useAuth } from "../Components/Context/AuthContext";

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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800">

        <h2 className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
              placeholder="Enter your password"
            />
          </div>

          {/* ✅ Forgot Password Added Here */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;