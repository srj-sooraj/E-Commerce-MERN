import { useState } from "react";
import API from "../Services/api";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyResetOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/verify-reset-otp", {
        email,
        otp,
      });

      alert(res.data.message);

     
      navigate("/reset-password", { state: { email,otp } });

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800">

        <h2 className="text-3xl font-bold text-center mb-8">
          Enter OTP
        </h2>

        <form onSubmit={handleVerify} className="space-y-6">

          <input
            type="text"
            placeholder="Enter OTP"
            required
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold"
          >
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
};

export default VerifyResetOtp;