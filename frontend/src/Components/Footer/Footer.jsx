import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            SRJ Store
          </h2>
          <p className="text-sm">
            Your trusted online shopping platform built with MERN Stack.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <p className="text-sm">Email: support@srjstore.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">India</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2026 SRJ Store | Built with MERN Stack 🚀
      </div>
    </footer>
  );
};

export default Footer;
