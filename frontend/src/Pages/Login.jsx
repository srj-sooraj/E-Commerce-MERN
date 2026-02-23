import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../Services/api";

const Login = () => {
  const navigate = useNavigate();
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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data.user));
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">

      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800">

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm text-slate-400">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;