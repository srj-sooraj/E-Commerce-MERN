import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/verify",
        { otp }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-white text-center">
          Email Verification
        </h2>

        <p className="text-gray-400 text-center text-sm mt-2">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-5">

          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 text-center text-lg tracking-widest bg-gray-800 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-400 hover:text-indigo-400 transition"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Verify;