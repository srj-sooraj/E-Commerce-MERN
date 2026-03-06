import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../Services/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, otp } = location.state || {};

  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="bg-slate-900 p-10 rounded-3xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-8">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="password"
            placeholder="Enter new password"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold"
          >
            Reset Password
          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPassword;