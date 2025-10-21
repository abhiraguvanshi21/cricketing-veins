'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Menu, X, User, LogOut, Sparkles, Home, Info, ChevronDown,
  BookOpen, Users, Settings, Trophy, Video, ClipboardList, Shield
} from 'lucide-react';
import { AuthService } from '@/lib/auth';

type UserType = {
  name: string;
  email: string;
  role: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const authService = AuthService.getInstance();

  useEffect(() => {
    setUser(authService.getCurrentUser());
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Blog', href: '/blog', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Team', href: '/team', icon: <Users className="w-4 h-4" /> },
  ];

  const serviceItems = [
    { name: 'Cricket Academy', href: '/services#academy', icon: <Trophy className="w-4 h-4 text-green-600" /> },
    { name: 'Live Streaming', href: '/services#streaming', icon: <Video className="w-4 h-4 text-blue-600" /> },
    { name: 'Ground Booking', href: '/services#ground', icon: <Settings className="w-4 h-4 text-orange-500" /> },
    { name: 'Umpire', href: '/services#umpire', icon: <Shield className="w-4 h-4 text-yellow-500" /> },
    { name: 'Scorer', href: '/services#scorer', icon: <ClipboardList className="w-4 h-4 text-emerald-500" /> },
  ];

  const handleSignOut = async () => {
    await authService.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-green-100'
          : 'bg-gradient-to-r from-white/90 via-green-50/70 to-white/90 backdrop-blur-sm shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/LOGO Cricketing Veins.png"
                alt="Cricketing Veins Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
                Cricketing Veins
              </span>
              <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 group flex items-center space-x-2"
              >
                {item.icon}
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-all duration-300">
                <Settings className="w-4 h-4" />
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showServices ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
              {showServices && (
                <div className="absolute top-10 left-0 w-56 bg-white rounded-xl shadow-xl border border-green-100 py-2 backdrop-blur-md z-50 animate-fadeIn">
                  {serviceItems.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                    >
                      {s.icon}
                      <span>{s.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Admin Panel
                  </Link>
                )}
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-full shadow-sm">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700 text-sm">{user.name}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none p-2 hover:bg-green-50 rounded-lg transition-all duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-green-100 rounded-b-xl py-3 space-y-2 animate-fadeIn">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-green-600 px-4 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-green-50 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            {/* Services on mobile */}
            <div className="px-4">
              <p className="text-sm text-gray-500 font-semibold mt-3">Services</p>
              {serviceItems.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {s.icon}
                  <span>{s.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
