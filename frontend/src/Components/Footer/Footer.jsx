import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden text-slate-300 w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full border-box">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Shop<span className="text-emerald-400">X</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Elevating your online shopping experience with premium products, secure payments, and lightning-fast delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Support
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all" /> Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Mail className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span>support@shopx.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <span>123 Innovation Drive,<br />Tech City, TC 10020</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ShopX. All rights reserved.</p>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 opacity-50 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
