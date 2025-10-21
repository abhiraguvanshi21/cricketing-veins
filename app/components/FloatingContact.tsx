'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-50 group animate-float"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse-custom"></div>
        
        {/* Main button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center overflow-hidden">
          {/* Logo background */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/LOGO Cricketing Veins.png" 
              alt="Contact" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Icon */}
          <MessageCircle className="w-8 h-8 text-white relative z-10 animate-pulse-custom" />
          
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Contact Us
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </Link>
  );
}