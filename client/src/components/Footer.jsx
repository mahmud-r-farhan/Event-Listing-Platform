import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-8 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-semibold text-white">
          EventListing<span className="text-blue-500">.io</span>
        </div>
        <div className="flex gap-4 text-sm">
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/terms" className="hover:text-white transition">Terms</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
        </div>
        <p className="text-xs text-gray-500">&copy; 2025 EventListing.io. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
