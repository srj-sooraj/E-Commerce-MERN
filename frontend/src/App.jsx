import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import MyOrders from "./Pages/MyOrders";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import AdminRoute from "./Pages/AdminRoute.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./Pages/ProductDetail.jsx";
import Wishlist from "./Pages/Whishlist.jsx";
import Checkout from "./Pages/Checkout.jsx";
import AdminOrders from "./Components/AdminOrders/AdminOrders.jsx";
import Profile from "./Pages/Profile.jsx";
import Verify from "./Pages/verify.jsx";
import ForgotPassword from "./Pages/forgotPassword.jsx";
import ResetPassword from "./Pages/resetPassword.jsx";
import VerifyResetOtp from "./Pages/verifyResetOtp.jsx";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;