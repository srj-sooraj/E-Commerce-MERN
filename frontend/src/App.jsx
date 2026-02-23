import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
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

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

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
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;