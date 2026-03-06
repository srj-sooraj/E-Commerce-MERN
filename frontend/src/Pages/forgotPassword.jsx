import { useState } from "react";
import API from "../Services/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", { email });
      alert(res.data.message);

      
      navigate("/verify-reset-otp", { state: { email } });

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800">

        <h2 className="text-3xl font-bold text-center mb-8">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Enter your registered email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold"
          >
            Send OTP
          </button>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;