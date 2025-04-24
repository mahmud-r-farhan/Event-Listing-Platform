import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-8 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-semibold text-white">
          <span className="text-blue-500">EventHub</span>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="/about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="/contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} Event Lisiting Hub, Under Development.
      </p>
    </footer>
  );
}

export default Footer;